const API_BASE = 'https://script.google.com/macros/s/AKfycbyfmemkEGxuQiDwTEGQzS6IsyzUEl1PtO-zX4_Ml9hYi5Hn0OcCBm7U5iyIed37XHTI/exec';

export async function fetchSheetData(sheet: string): Promise<any[]> {
  try {
    const url = `${API_BASE}?sheet=${encodeURIComponent(sheet)}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch ${sheet}`);
    const data = await response.json();
    return Array.isArray(data) ? data : data.data || [];
  } catch (error) {
    console.error(`Error fetching ${sheet}:`, error);
    return [];
  }
}

export async function fetchAllData() {
  const sheets = [
    'Students',
    'Courses',
    'Enrollments',
    'Schedule',
    'Attendance',
    'Quests',
    'StudentQuests',
    'Announcements',
    'Requests',
  ];

  const results = await Promise.allSettled(
    sheets.map((sheet) => fetchSheetData(sheet))
  );

  return {
    students: results[0].status === 'fulfilled' ? results[0].value : [],
    courses: results[1].status === 'fulfilled' ? results[1].value : [],
    enrollments: results[2].status === 'fulfilled' ? results[2].value : [],
    schedule: results[3].status === 'fulfilled' ? results[3].value : [],
    attendance: results[4].status === 'fulfilled' ? results[4].value : [],
    quests: results[5].status === 'fulfilled' ? results[5].value : [],
    studentQuests: results[6].status === 'fulfilled' ? results[6].value : [],
    announcements: results[7].status === 'fulfilled' ? results[7].value : [],
    requests: results[8].status === 'fulfilled' ? results[8].value : [],
  };
}

export async function submitRequest(data: {
  studentId: string;
  type: string;
  subject: string;
  description: string;
}) {
  try {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sheet: 'Requests', action: 'add', ...data }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error submitting request:', error);
    throw error;
  }
}
