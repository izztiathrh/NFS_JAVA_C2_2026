package com.fullstack.demo.service;

private final StudentRepository studentRepository;

public StudentService(StudentRepository studentRepository) {
    this.studentRepository = studentRepository;
}

public Student registerStudent(Student student) {
return studentRepository.save(student);
        
}