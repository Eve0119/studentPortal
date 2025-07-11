import * as XLSX from 'xlsx';


export function getAge(dateOfBirth) {
  if (!dateOfBirth) return '-'
  const dob = new Date(dateOfBirth)
  const today = new Date()
  let age = today.getFullYear() - dob.getFullYear()
  const m = today.getMonth() - dob.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--
  }
  return age
}

export function formatDate(date){
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

export const exportToExcel = (data, fileName = 'students.xlsx') => {
  // Format the data for export
  const formattedData = data.map(student => ({
    'Last Name': student.lastName,
    'First Name': student.firstName,
    'Middle Initial': student.middleInitial,
    'Student ID': student.studentId,
    'Grade': student.grade,
    'Age': getAge(student.dateOfBirth),
    'Gender': student.gender,
    'Guardian': student.parentGuardianName,
    'Contact': student.parentContactNumber,
    'Email': student.parentEmail,
    'Enrollment Date': formatDate(new Date(student.enrollmentDate)),
    'Birth Date': formatDate(new Date(student.dateOfBirth))
  }));

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(formattedData);
  XLSX.utils.book_append_sheet(wb, ws, "Students");
  XLSX.writeFile(wb, fileName);
};

export function capitalizeWords(str) {
  return str.replace(/\b\w/g, char => char.toUpperCase());
}