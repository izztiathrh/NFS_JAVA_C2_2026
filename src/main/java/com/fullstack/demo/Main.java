package com.fullstack.demo;

import com.fullstack.demo.model.Course;
import com.fullstack.demo.model.CourseOffering;
import com.fullstack.demo.model.Instructor;
import com.fullstack.demo.model.Student;
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        // Syntax for creating a new object (instance) of the Course class
        // ClassName objectName = new Constructor();
        // ClassName and Constructor usually match

        ArrayList<Instructor> instructors = new ArrayList<>();
            instructors.add(new Instructor("I001", "Alice Johnson", "Java Development"));
            instructors.add(new Instructor("I002", "Bob Smith", "React Development"));

        ArrayList<Course> courses = new ArrayList<>();
            courses.add(new Course("C001", "Java Fundamentals", 14, "Beginner"));
            courses.add(new Course("C002", "React Frontend Development", 21, "Intermediate"));
            courses.add(new Course("C003", "MongoDB Basics", 14, "Beginner"));

        ArrayList<Student> students = new ArrayList<>();
            Student student1 = new Student("S001", "Charlie Brown", "cFq0l@example.com");
            Student student2 = new Student("S002", "Daisy Duck", "d4oQG@example.com");
            students.add(student1);
            students.add(student2);

        ArrayList<CourseOffering> offerings = new ArrayList<>();
        offerings.add(new CourseOffering("O001", "Java Fundamentals - Spring 2024", courses.get(0), instructors.get(0),
                "2024-01-15", "2024-02-15", 30, "Online"));
        offerings.add(new CourseOffering("O002", "React Frontend Development - Spring 2024", courses.get(1), instructors.get(1),
                "2024-01-20", "2024-02-20", 25, "In-Person"));


        for (Course course : courses) {
            course.printSummary();
}

    }
}
