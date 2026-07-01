package com.attendance.smartattendance.service;

import com.attendance.smartattendance.dto.StudentAttendanceDTO;
import com.attendance.smartattendance.entity.Student;
import com.attendance.smartattendance.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ReportsService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private AttendanceService attendanceService;

    public Map<String, List<StudentAttendanceDTO>> getDepartmentReport() {

        List<Student> students = studentRepository.findAll();

        return students.stream()
                .collect(Collectors.groupingBy(
                        Student::getDepartment,
                        Collectors.mapping(student -> {

                            double percentage = attendanceService
                                    .getAttendancePercentage(student.getId());

                            return new StudentAttendanceDTO(
                                    student.getName(),
                                    percentage
                            );

                        }, Collectors.toList())
                ));
    }
}