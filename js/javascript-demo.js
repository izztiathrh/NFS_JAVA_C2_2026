// JS does not require classes for simple data

/* Java:
1. Stricter type checking
2. Class-based structure
3. Private fields and methods (getters/setters)
4. Compile-time errors
5. More boilerplate code 
*/

/**
JavaScript:
    1. Dynamic typing
    2. Prototype-based structure
    3. No private fields (ES6 introduced private fields with #)
    4. Properties can be accessed and modified at runtime
    5. Less boilerplate code
    6. Object literals and functions can be used to create objects without classes
    7. Runtime errors
*/


const course = {
    courseId: "CS101",
    courseName: "Introduction to Computer Science",
    durationHours: 40,
    level: "Beginner",
    instructor: "Dr. Smith",
};

console.log("== Course Details ==");
console.log(`Course ID: ${course.courseId}`);
console.log(`Course Name: ${course.courseName}`);
console.log(`Duration: ${course.durationHours} hours`);
console.log(`Level: ${course.level}`);
console.log(`Instructor: ${course.instructor}`);
