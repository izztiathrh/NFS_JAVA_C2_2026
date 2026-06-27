const statusMessage = document.getElementById('status-message');
const studentList = document.getElementById('student-list');

function renderStudents(students) {
    studentList.innerHTML = ''; // Clear previous content

    if (students.length === 0) {
        statusMessage.textContent = 'No students found.';
        return;
    }

    students.forEach(student => {
        const studentCard = document.createElement('div');
        studentCard.classList.add('student-card');
        studentCard.innerHTML = `
            <h2>${student.studentName}</h2>
            <p>Student ID: ${student.studentId}</p>
            <p>Email: ${student.email}</p>
            <p>Status: ${student.status}</p>
        `;
        studentList.appendChild(studentCard);
    });

}

async function loadStudents() {
    try {
        statusMessage.textContent = 'Loading student data...';
        const response = await fetch('students.json');

        if (!response.ok) {
            throw new Error('Failed to fetch students.json');
        }

        const students = await response.json();

        statusMessage.textContent = 'Student data loaded successfully.';
        renderStudents(students);

    } catch (error) {
         statusMessage.textContent = "Error: " + error.message;
    }
}

loadStudents();