export type NavigationPage =
  | 'dashboard'
  | 'courses'
  | 'quests'
  | 'materials'
  | 'schedule'
  | 'attendance'
  | 'announcements'
  | 'requests'
  | 'library';

export interface Student {
  StudentID: string;
  Name: string;
  Email: string;
  Major: string;
  Year: string;
  GPA: string;
  Status: string;
  Avatar?: string;
}

export interface Course {
  CourseID: string;
  CourseName: string;
  Instructor: string;
  Credits: string;
  Department: string;
  Description: string;
  Schedule?: string;
  Room?: string;
}

export interface Enrollment {
  EnrollmentID: string;
  StudentID: string;
  CourseID: string;
  Semester: string;
  Grade: string;
  Status: string;
}

export interface ScheduleItem {
  ScheduleID: string;
  CourseID: string;
  CourseName: string;
  Day: string;
  StartTime: string;
  EndTime: string;
  Room: string;
  Instructor: string;
}

export interface AttendanceRecord {
  AttendanceID: string;
  StudentID: string;
  CourseID: string;
  CourseName: string;
  Date: string;
  Status: string;
  Notes: string;
}

export interface Quest {
  QuestID: string;
  Title: string;
  Description: string;
  Type: string;
  Points: string;
  Deadline: string;
  CourseID: string;
  CourseName: string;
  Status: string;
}

export interface StudentQuest {
  StudentQuestID: string;
  StudentID: string;
  QuestID: string;
  Status: string;
  SubmittedDate: string;
  Score: string;
  Feedback: string;
}

export interface Announcement {
  AnnouncementID: string;
  Title: string;
  Content: string;
  Author: string;
  Date: string;
  Priority: string;
  Category: string;
  TargetAudience: string;
}

export interface Request {
  RequestID: string;
  StudentID: string;
  Type: string;
  Subject: string;
  Description: string;
  Status: string;
  SubmittedDate: string;
  ResolvedDate: string;
  Response: string;
}

export interface LibraryResource {
  name: string;
  icon: string;
  description: string;
  url: string;
  category: string;
  color: string;
  gradient: string;
}

export interface ApiData {
  students: Student[];
  courses: Course[];
  enrollments: Enrollment[];
  schedule: ScheduleItem[];
  attendance: AttendanceRecord[];
  quests: Quest[];
  studentQuests: StudentQuest[];
  announcements: Announcement[];
  requests: Request[];
}
