const statusMessage = document.getElementById("status-message");
const courseList = document.getElementById("course-list");

function renderCourses(courses) {
    courseList.innerHTML = ""; // Clear previous content
    
    if (courses.length === 0) {
        statusMessage.textContent = "No courses available.";
        return;
    }


    courseList.innerHTML = courses.map(course => {
        const courseCard = document.createElement("div");

        courseCard.innerHTML = `
            <h2>${course.title}</h2>
            <p>Course ID: ${course.id}</p>
            <p>Duration: ${course.durationHours} hours</p>
            <p>Level: ${course.level}</p>
            <p>Instructor: ${course.instructor}</p>
        `; 
        courseList.appendChild(courseCard);
    });
}

/* 
async -> function will do something and might take some time to complete, it will return a promise

loading data from a file/API can take time, so use async to handle that without the rest of the program
*/
async function loadCourses() {
    try { //to handle errors
        statusMessage.textContent = "Loading courses...";

        const response = await fetch("courses.json");//fetch() request data 
        if (!response.ok) {
            throw new Error(`Failed to fetch courses.json`);
        }

        //await() waits for the response/result, response.json() convert JSONtest in Js object
        const courses = await response.json(); 

        statusMessage.textContent = '';
        renderCourses(courses);
    } catch (error) {
        statusMessage.textContent = `Error loading courses: ${error.message}`;
    }
}

loadCourses();
    
