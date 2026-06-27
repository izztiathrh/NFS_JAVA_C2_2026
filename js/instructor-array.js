const instructors = [
    {
        instructorId: "I001",
        instructorName: "Dr. Smith",
        expertise: "Computer Science",
    },
    
    {
        instructorId: "I002",
        instructorName: "Dr. Johnson",
        expertise: "Data Structures and Algorithms",
    },

    {
        instructorId: "I003",
        instructorName: "Dr. Williams",
        expertise: "Web Development",
    },

    {
        instructorId: "I004",
        instructorName: "Dr. Brown",
        expertise: "Database Systems",
    }
    
];

console.log("== Instructors List ==");
for (const instructor of instructors) {
    console.log(`${instructor.instructorId} - ${instructor.instructorName} - ${instructor.expertise}`);
}

console.log("\nTotal Instructors: " + instructors.length);
