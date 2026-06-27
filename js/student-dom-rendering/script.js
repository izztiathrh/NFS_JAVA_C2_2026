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

students.forEach(student => {
    const studentCard = document.createElement("div"); // create a new div element

    studentCard.innerHTML = `
        <h2>${student.studentName}</h2>
        <p>Student ID: ${student.studentId}</p>
        <p>Email: ${student.email}</p>
        <p>Status: ${student.status}</p>
    `;
    studentList.appendChild(studentCard); // put new element into page under element with id student-list
});