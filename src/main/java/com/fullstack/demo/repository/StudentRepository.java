package com.fullstack.demo.repository;

import com.fullstack.demo.model.Student;
import java.util.List;
import java.util.Optional;

public interface StudentRepository {
    Student save(Student student);
    Optional<Student> findById(String studentId);
    List<Student> findAll();
    void deleteById(String studentId);
    boolean existsById(String studentId);
}