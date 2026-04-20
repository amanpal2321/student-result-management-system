package com.example.demo.service;

import com.example.demo.entity.Student;
import com.example.demo.repository.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository repo;

    public StudentService(StudentRepository repo) {
        this.repo = repo;
    }

    public List<Student> getAll() {
        return repo.findAll();
    }

    public Student save(Student s) {
        String email = s.getEmail().trim().toLowerCase();
        if (repo.existsByEmail(email)) {
            throw new IllegalArgumentException("Student email already exists.");
        }
        s.setEmail(email);
        return repo.save(s);
    }

    public Student update(Long id, Student updatedStudent) {
        Student existingStudent = repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Student not found."));

        String email = updatedStudent.getEmail().trim().toLowerCase();
        if (repo.existsByEmailAndIdNot(email, id)) {
            throw new IllegalArgumentException("Another student already uses this email.");
        }

        existingStudent.setName(updatedStudent.getName().trim());
        existingStudent.setEmail(email);
        existingStudent.setCourse(updatedStudent.getCourse().trim());
        return repo.save(existingStudent);
    }

    public void delete(Long id) {
        Student existingStudent = repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Student not found."));
        repo.delete(existingStudent);
    }

    public long countStudents() {
        return repo.count();
    }
}
