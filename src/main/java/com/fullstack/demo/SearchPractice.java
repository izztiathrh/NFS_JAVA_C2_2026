package com.fullstack.demo;

import com.fullstack.demo.model.Course;
import com.fullstack.demo.repository.CourseRepository;
import com.fullstack.demo.repository.InMemoryCourseRepository;
import com.fullstack.demo.service.CourseService;
import java.util.List;

public class SearchPractice {
    public static void main(String[] args) {
        CourseRepository courseRepository = new InMemoryCourseRepository();
        CourseService courseService = new CourseService(courseRepository);

        courseRepository.save(new Course("C001", "Java Fundamentals", 14, "Beginner"));
        courseRepository.save(new Course("C002", "React Frontend Development", 21, "Intermediate"));
        courseRepository.save(new Course("C003", "MongoDB Basics", 10, "Beginner"));
        courseRepository.save(new Course("C004", "Spring Boot API Development", 18, "Intermediate"));

        List<Course> beginnerCourses = courseService.searchByLevelUsingLoop("Beginner");

        System.out.println("=== Beginner Courses ===");
        for (Course course : beginnerCourses) {
            System.out.println(course.getCourseId() + " - " + course.getTitle());
        }

        List<Course> intermediateCourses = courseService.searchByLevelUsingStream("Intermediate");

        System.out.println("=== Intermediate Courses ===");
        for (Course course : intermediateCourses) {
            System.out.println(course.getCourseId() + " - " + course.getTitle());
        }

        List<Course> longCourses = courseService.searchByMinimumDurationUsingLoop(15);

        System.out.println("=== Long Courses (>= 15 hours) ===");
        for (Course course : longCourses) {
            System.out.println(course.getCourseId() + " - " + course.getTitle());
        }
    }
}
