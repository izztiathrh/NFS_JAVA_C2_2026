package com.fullstack.demo;

import com.fullstack.demo.model.Course;
import com.fullstack.demo.model.CourseOffering;
import com.fullstack.demo.model.Instructor;

public class ObjectRelationship {

    public static void main(String[] args) {
        // Create an instructor
        Instructor instructor = new Instructor("I001", "Mike Rahman", "Java and Spring Boot");
        Instructor instructor2 = new Instructor("I002", "Marcus Lee", "React and Frontend Development");

        // Create a course
        Course course = new Course("C001", "Java Fundamentals", 14, "Beginner");
        Course course2 = new Course("C002", "React Frontend Development", 21, "Intermediate");

        course.setInstructor(instructor);
        course2.setInstructor(instructor2);

        System.out.println("=== Courses ===");
        course.printSummary();
        course2.printSummary();

        // CourseOffering uses composition because it has a Course and has an Instructor.
        CourseOffering courseOffering = new CourseOffering("OFF001", "Java Fundamentals June Intake", course, instructor, "2026-06-29", "2026-06-30", 25, "Physical");
        CourseOffering courseOffering2 = new CourseOffering("OFF002", "React Frontend July Intake", course2,
                instructor2, "2026-07-01", "2026-07-03", 20, "Hybrid");
        CourseOffering courseOffering3 = new CourseOffering("OFF003", "Java Fundamentals July Weekend Intake", course, instructor, "2026-07-11", "2026-07-12", 15, "Online");

        
        
        System.out.println("=== Course Offerings ===");
        
        courseOffering.printSummary();
        System.out.println();
        courseOffering2.printSummary();
        System.out.println();
        courseOffering3.printSummary();

    }
}