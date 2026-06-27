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
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const resetButton = document.getElementById("reset-button");

function renderCourses(courseArray) {
    courseListDiv.innerHTML = ""; // Clear previous content

    if (courseArray.length === 0) {
        courseListDiv.innerHTML = "<p>No courses found.</p>";
        return;
    }

    courseArray.forEach(course => {
        const courseCard = document.createElement("div");
        courseCard.classList.add("course-card");

        courseCard.innerHTML = `
            <h3>${course.title}</h3>
            <p><strong>Course ID:</strong> ${course.id}</p>
            <p><strong>Duration:</strong> ${course.durationHours} hours</p>
            <p><strong>Level:</strong> ${course.level}</p>
            <p><strong>Instructor:</strong> ${course.instructor}</p>
        `;

        courseListDiv.appendChild(courseCard);
    });
}

searchButton.addEventListener("click", () => {
    const keyword = searchInput.value.trim().toLowerCase();

    const results = courses.filter(course =>
        course.title.toLowerCase().includes(keyword) ||
        course.id.toLowerCase().includes(keyword) ||
        course.level.toLowerCase().includes(keyword) ||
        course.instructor.toLowerCase().includes(keyword)
    );
    renderCourses(results);
});

resetButton.addEventListener("click", () => {
    searchInput.value = "";
    renderCourses(courses);
});

renderCourses(courses); // Initial render of all courses