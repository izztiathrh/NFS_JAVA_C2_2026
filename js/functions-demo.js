// Functions and Arrow functions

const course = {
    courseId: "CS101",
    courseName: "Introduction to Computer Science",
    durationHours: 40,
    level: "Beginner",
    instructor: "Dr. Smith",
};

//Normal function declaration
function formatCourse(course) {
    return `${course.courseId} - ${course.courseName} - Duration: ${course.durationHours} hours - Level: ${course.level} - Instructor: ${course.instructor}`;
}

//Arrow function declaration
const formatCourseArrow = (course) => {
    return `${course.courseId} - ${course.courseName} - Duration: ${course.durationHours} hours - Level: ${course.level} - Instructor: ${course.instructor}`;
}

//Short arrow function declaration
const getCourseTitle = (course) => `${course.courseId} - ${course.courseName}`;

console.log("== Course Details ==");
console.log(formatCourse(course));

console.log("\n== Course Details using Arrow Function ==");
console.log(formatCourseArrow(course));

console.log("\n== Course Title using Short Arrow Function ==");
console.log(getCourseTitle(course));