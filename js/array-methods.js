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

/*
forEach -> do something for each element in the array
filter -> filter the array based on a condition
find -> find the first element that matches a condition
map -> create a new array by transforming each element in the array
 */

console.log("== Course Details ==");
courses.forEach(course => {
    console.log(course.title);
});

/*
courses.stream()
    .filter(course -> course.level.equals("Beginner"))
    .toList();
*/
console.log("\nfilter courses with level 'Beginner' ==");
const beginnerCourses = courses.filter(course => course.level === "Beginner");
console.log(beginnerCourses);

console.log("\nfind course with id 'CS102' ==");
const courseCS102 = courses.find(course => course.id === "CS102");
console.log(courseCS102);

console.log("\nmap course titles ==");
const courseTitles = courses.map(course => course.title);
console.log(courseTitles);

const newLengthAfterPush = courses.push({
    id: "CS104",
    title: "Database Management Systems",
    durationHours: 40,
    level: "Intermediate",
    instructor: "Dr. Brown"
});
console.log("\nNew length after push: " + newLengthAfterPush);

