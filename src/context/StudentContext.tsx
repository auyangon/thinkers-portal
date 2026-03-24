import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchAllData } from '../services/api';
import type {
  Student,
  Course,
  Enrollment,
  ScheduleItem,
  AttendanceRecord,
  Quest,
  StudentQuest,
  Announcement,
  Request,
} from '../types';

interface StudentContextType {
  currentStudent: Student | null;
  students: Student[];
  courses: Course[];
  enrollments: Enrollment[];
  schedule: ScheduleItem[];
  attendance: AttendanceRecord[];
  quests: Quest[];
  studentQuests: StudentQuest[];
  announcements: Announcement[];
  requests: Request[];
  loading: boolean;
  error: string | null;
  login: (email: string, name?: string, picture?: string) => void;
  logout: () => void;
  refreshData: () => Promise<void>;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export function StudentProvider({ children }: { children: React.ReactNode }) {
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [studentQuests, setStudentQuests] = useState<StudentQuest[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllData();
      setStudents(data.students);
      setCourses(data.courses);
      setEnrollments(data.enrollments);
      setSchedule(data.schedule);
      setAttendance(data.attendance);
      setQuests(data.quests);
      setStudentQuests(data.studentQuests);
      setAnnouncements(data.announcements);
      setRequests(data.requests);
    } catch (err) {
      setError('Failed to load data. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const login = useCallback(
    (email: string, name?: string, picture?: string) => {
      const found = students.find(
        (s) => s.Email?.toLowerCase() === email.toLowerCase()
      );
      if (found) {
        setCurrentStudent({ ...found, Avatar: picture || found.Avatar });
      } else {
        // Create a guest student entry
        setCurrentStudent({
          StudentID: 'GUEST',
          Name: name || email.split('@')[0],
          Email: email,
          Major: 'Undeclared',
          Year: '1',
          GPA: '0.00',
          Status: 'Active',
          Avatar: picture,
        });
      }
    },
    [students]
  );

  const logout = useCallback(() => {
    setCurrentStudent(null);
  }, []);

  return (
    <StudentContext.Provider
      value={{
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
        loading,
        error,
        login,
        logout,
        refreshData: loadData,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudent() {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudent must be used within a StudentProvider');
  }
  return context;
}
