const students = [
  { studentId: "S001", studentName: "Ignacio de Paul", email: "ignacio@example.com", status: "Active" },
  { studentId: "S002", studentName: "Ben Tan", email: "ben@example.com", status: "Inactive" },
  { studentId: "S003", studentName: "Chong Mei", email: "mei@example.com", status: "Active" }
];

/* 
 DOM Rendering and manipulation of student data

 HTML - page structure
 CSS - styling
 JS - page behavior and interactivity
 DOM - Document Object Model browser's object version of the HTML page.
 */

const studentList = document.getElementById("student-list"); //finding 
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const resetButton = document.getElementById("reset-button");


function renderStudents(studentArray) {
    studentList.innerHTML = ""; // Clear the existing student list
    
    if (studentArray.length === 0) {
        studentList.innerHTML = "<p>No students found.</p>";
        return;
    }

    studentArray.forEach(student => {
        const studentCard = document.createElement("div");
        studentCard.classList.add("student-card");
        studentCard.innerHTML = `
            <h2>${student.studentName}</h2>
            <p>Student ID: ${student.studentId}</p>
            <p>Email: ${student.email}</p>
            <p>Status: ${student.status}</p>
        `;
        studentList.appendChild(studentCard);
    });
}

searchButton.addEventListener("click", () => {
    const keyword = searchInput.value.trim().toLowerCase();
    const results = students.filter(student =>
        student.studentName.toLowerCase().includes(keyword) ||
        student.studentId.toLowerCase().includes(keyword) 
    );
    renderStudents(results);
});

resetButton.addEventListener("click", () => {
    searchInput.value = "";
    renderStudents(students);
});

renderStudents(students); // Initial render of all students