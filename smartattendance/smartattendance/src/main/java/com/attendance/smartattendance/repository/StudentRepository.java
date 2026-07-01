package com.attendance.smartattendance.repository;

import com.attendance.smartattendance.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;




public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByRollNumberAndPassword(String rollNumber, String password);
    List<Student> findByDepartment(String department);


}