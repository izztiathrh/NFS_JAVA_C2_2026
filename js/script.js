const courses = [
    {
        id: "CS101",
        title: "Introduction to Computer Science",
        durationHours: 40,
        level: "Beginner",
        instructor: "Dr. Smith"
    },
    {
        id: "CS102",
        title: "Data Structures and Algorithms",
        durationHours: 40,
        level: "Intermediate",
        instructor: "Dr. Johnson"
    },
    {
        id: "CS103",
        title: "Web Development",
        durationHours: 40,
        level: "Intermediate",
        instructor: "Dr. Williams"
    }
];

const courseListDiv = document.getElementById("course-list");

courses.forEach(course => {
    const courseCard = document.createElement("div");

    courseCard.innerHTML = `
        <h2>${course.title}</h2>
        <p>Course ID: ${course.id}</p>
        <p>Duration: ${course.durationHours} hours</p>
        <p>Level: ${course.level}</p>
        <p>Instructor: ${course.instructor}</p>
    `;
    courseListDiv.appendChild(courseCard);
});