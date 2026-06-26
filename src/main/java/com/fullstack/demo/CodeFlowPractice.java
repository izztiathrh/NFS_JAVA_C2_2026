package com.fullstack.demo;

import com.fullstack.demo.model.Course;
import com.fullstack.demo.repository.CourseRepository;
import com.fullstack.demo.repository.InMemoryCourseRepository;
import com.fullstack.demo.service.CourseService;

public class CodeFlowPractice {
    public static void main(String[] args) {

        //Why do we create the repository first? - to provide the service with a data access layer to interact with the data source (in this case, an in-memory repository). The service needs to perform operations like creating, retrieving, updating, and deleting courses, which requires a repository to handle the actual data storage and retrieval.
        //Why does CourseService need CourseRepository? - The CourseService needs the CourseRepository to perform its operations on the course data. The repository acts as an abstraction layer that handles the data access logic, allowing the service to focus on business logic without worrying about how the data is stored or retrieved. This separation of concerns makes the code more modular, maintainable, and testable.
        CourseRepository courseRepository = new InMemoryCourseRepository();
        CourseService courseService = new CourseService(courseRepository);

        // Create a new course
        Course javaCourse = new Course("C004", "Spring Boot API Development", 18, "Intermediate");      
        courseService.createCourse(javaCourse);

        // 1. Demo class calls CourseService.
        // 2. CourseService validates the course.
        // 3. CourseService asks CourseRepository to save or find the course.
        // 4. InMemoryCourseRepository stores the course in memory.
        // 5. Course object is returned to the demo class.
        
        Course foundCourse = courseService.getCourseById("C004");
        foundCourse.printSummary();
    }   
}
