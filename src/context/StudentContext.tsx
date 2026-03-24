import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  fetchStudents,
  fetchCourses,
  fetchEnrollmentsByEmail,
  fetchSchedule,
  fetchAttendanceByEmail,
  fetchQuests,
  fetchStudentQuestsByEmail,
  fetchAnnouncements,
  fetchRequestsByEmail,
} from '../services/api';
import type { Student, Course, Enrollment, Schedule, Attendance, Quest, StudentQuest, Announcement, Request } from '../types';

interface StudentContextType {
  currentStudent: Student | null;
  students: Student[];
  courses: Course[];
  enrollments: Enrollment[];
  schedule: Schedule[];
  attendance: Attendance[];
  quests: Quest[];
  studentQuests: StudentQuest[];
  announcements: Announcement[];
  requests: Request[];
  isLoading: boolean;
  error: string | null;
  loginWithGoogle: (email: string) => Promise<boolean>;
  logout: () => void;
  refreshData: () => Promise<void>;
  getEnrolledCourses: () => Course[];
  getStudentSchedules: () => Schedule[];
  getCourseByCode: (code: string) => Course | undefined;
}

const StudentContext = createContext<StudentContextType | null>(null);

export function StudentProvider({ children }: { children: React.ReactNode }) {
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [studentQuests, setStudentQuests] = useState<StudentQuest[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginWithGoogle = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const allStudents = await fetchStudents();
      setStudents(allStudents);
      const student = allStudents.find(s => s.email?.toLowerCase().trim() === email?.toLowerCase().trim());
      if (!student) {
        setError('Email not found. Please use your AUY email.');
        return false;
      }
      setCurrentStudent(student);

      const [
        allCourses,
        studentEnrollments,
        allSchedule,
        studentAttendance,
        allQuests,
        studentStudentQuests,
        allAnnouncements,
        studentRequests,
      ] = await Promise.all([
        fetchCourses(),
        fetchEnrollmentsByEmail(email),
        fetchSchedule(),
        fetchAttendanceByEmail(email),
        fetchQuests(),
        fetchStudentQuestsByEmail(email),
        fetchAnnouncements(),
        fetchRequestsByEmail(email),
      ]);

      setCourses(allCourses);
      setEnrollments(studentEnrollments);
      setSchedule(allSchedule);
      setAttendance(studentAttendance);
      setQuests(allQuests);
      setStudentQuests(studentStudentQuests);
      setAnnouncements(allAnnouncements);
      setRequests(studentRequests);

      return true;
    } catch (err) {
      console.error('Login failed:', err);
      setError('Failed to load data. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setCurrentStudent(null);
    setStudents([]);
    setCourses([]);
    setEnrollments([]);
    setSchedule([]);
    setAttendance([]);
    setQuests([]);
    setStudentQuests([]);
    setAnnouncements([]);
    setRequests([]);
  };

  const refreshData = async () => {
    if (currentStudent) {
      await loginWithGoogle(currentStudent.email);
    }
  };

  const getEnrolledCourses = useCallback(() => {
    const enrolledCodes = enrollments.map(e => e.courseCode);
    return courses.filter(c => enrolledCodes.includes(c.courseCode));
  }, [courses, enrollments]);

  const getStudentSchedules = useCallback(() => {
    const enrolledCodes = enrollments.map(e => e.courseCode);
    return schedule.filter(s => enrolledCodes.includes(s.courseCode));
  }, [schedule, enrollments]);

  const getCourseByCode = useCallback((code: string) => {
    return courses.find(c => c.courseCode === code);
  }, [courses]);

  const value: StudentContextType = {
    currentStudent,
    students,
    courses,
    enrollments,
    schedule,
    attendance,
    quests,
    studentQuests,
    announcements,
    requests,
    isLoading,
    error,
    loginWithGoogle,
    logout,
    refreshData,
    getEnrolledCourses,
    getStudentSchedules,
    getCourseByCode,
  };

  return <StudentContext.Provider value={value}>{children}</StudentContext.Provider>;
}

export function useStudent() {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
}
