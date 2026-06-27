/*Java -->
List <Courses> courses =  new ArrayList<>();

Js -->
const courses = [1,2,3]*/

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

console.log("== Course Details ==");
//''called a backtick or grave accent, used for template literals in JavaScript
for (const course of courses) {
    console.log(`${course.id} - ${course.title} - Level: ${course.level}`);
}

console.log ("\nTotal Courses: " + courses.length);