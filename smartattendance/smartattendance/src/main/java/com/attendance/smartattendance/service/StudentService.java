package com.attendance.smartattendance.service;

import com.attendance.smartattendance.entity.Student;
import com.attendance.smartattendance.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository repository;

    public Student saveStudent(Student student) {
        return repository.save(student);
    }

    public List<Student> getAllStudents() {
        return repository.findAll();
    }
    public Student getStudentById(Long id) {
        return repository.findById(id).orElse(null);
    }
    public Student updateStudent(Long id, Student student) {
        Student existingStudent = repository.findById(id).orElse(null);

        if (existingStudent != null) {
            existingStudent.setName(student.getName());
            existingStudent.setRollNumber(student.getRollNumber());
            existingStudent.setDepartment(student.getDepartment());
            existingStudent.setYear(student.getYear());
            existingStudent.setEmail(student.getEmail());

            return repository.save(existingStudent);
        }

        return null;
    }
    public void deleteStudent(Long id) {
        repository.deleteById(id);
    }
    public Student login(String rollNumber, String password) {

        return repository
                .findByRollNumberAndPassword(rollNumber, password)
                .orElseThrow(() ->
                        new RuntimeException("Invalid Roll Number or Password"));

    }
    public List<Student> getStudentsByDepartment(String department){

        return repository.findByDepartment(department);

    }
}