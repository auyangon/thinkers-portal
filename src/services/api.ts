const API_BASE_URL = 'https://script.google.com/macros/s/AKfycbyfmemkEGxuQiDwTEGQzS6IsyzUEl1PtO-zX4_Ml9hYi5Hn0OcCBm7UYIed37XHTI/exec';

export async function fetchSheet(sheetName) {
  try {
    const url = API_BASE_URL + '?sheet=' + sheetName;
    const response = await fetch(url);
    if (!response.ok) throw new Error('HTTP ' + response.status);
    return await response.json();
  } catch (error) {
    console.error('Error fetching', sheetName, error);
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

export async function addRequest(data) {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sheet: 'Requests', action: 'add', data }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error adding request', error);
    return { error: error.message };
  }
}
