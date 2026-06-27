package com.fullstack.demo;

import com.fullstack.demo.exception.StudentNotFoundException;
import com.fullstack.demo.model.Student;
import com.fullstack.demo.repository.InMemoryStudentRepository;
import com.fullstack.demo.repository.StudentRepository;
import com.fullstack.demo.service.StudentService;
import java.util.List;

public class StudentServicePractice {

    public static void main(String[] args) {

        StudentRepository studentRepository = new InMemoryStudentRepository();
        StudentService studentService = new StudentService(studentRepository);

        System.out.println("=== Register Students ===");
        studentService.registerStudent(new Student("S001", "Roberto Chan", "roberto@example.com"));
        studentService.registerStudent(new Student("S002", "Priya Nair", "priya@example.com"));
        studentService.registerStudent(new Student("S003", "Lee Salazae", "lee@example.com"));

        System.out.println("\n=== All Students ===");
        printStudents(studentService.getAllStudents());

        System.out.println("\n=== Find Student By ID ===");
        Student foundStudent = studentService.getStudentById("S001");
        foundStudent.printProfile();

        System.out.println("\n=== Search Student By Name ===");
        List<Student> searchResults = studentService.searchByNameUsingLoop("lee");
        printStudents(searchResults);

        System.out.println("\n=== Missing Student Test ===");
        try {
            studentService.getStudentById("S999");
        } catch (StudentNotFoundException e) {
            System.out.println(e.getMessage());
        }
    }

    private static void printStudents(List<Student> students) {
        if (students.isEmpty()) {
            System.out.println("No students found.");
            return;
        }

        for (Student student : students) {
            student.printProfile();
        }
    }
}
