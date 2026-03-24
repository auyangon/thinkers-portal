const API_BASE_URL = 'https://script.google.com/macros/s/AKfycbyfmemkEGxuQiDwTEGQzS6IsyzUEl1PtO-zX4_Ml9hYi5Hn0OcCBm7U5iyIed37XHTI/exec';

export async function fetchSheet(sheetName: string) {
  try {
    const url = API_BASE_URL + '?sheet=' + sheetName;
    console.log('📡 Fetching:', sheetName);
    const response = await fetch(url);
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const data = await response.json();
    console.log('✅ Loaded', sheetName, data.length);
    return data;
  } catch (error) {
    console.error('❌ Error fetching', sheetName, error);
    return [];
  }
}

export const fetchStudents = () => fetchSheet('Students');
export const fetchCourses = () => fetchSheet('Courses');
export const fetchEnrollments = () => fetchSheet('Enrollments');
export const fetchSchedule = () => fetchSheet('Schedule');
export const fetchAttendance = () => fetchSheet('Attendance');
export const fetchQuests = () => fetchSheet('Quests');
export const fetchStudentQuests = () => fetchSheet('StudentQuests');
export const fetchAnnouncements = () => fetchSheet('Announcements');
export const fetchRequests = () => fetchSheet('Requests');
