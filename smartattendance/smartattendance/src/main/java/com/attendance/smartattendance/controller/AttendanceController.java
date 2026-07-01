package com.attendance.smartattendance.controller;

import com.attendance.smartattendance.entity.Attendance;
import com.attendance.smartattendance.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.attendance.smartattendance.dto.AttendanceDTO;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/attendance")
@CrossOrigin("*")
public class AttendanceController {

    @Autowired
    private AttendanceService service;

    @PostMapping
    public ResponseEntity<?> markAttendance(@RequestBody Attendance attendance) {

        try {
            Attendance savedAttendance = service.markAttendance(attendance);
            return ResponseEntity.ok(savedAttendance);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public List<Attendance> getAllAttendance() {
        return service.getAllAttendance();
    }

    @GetMapping("/student/{studentId}")
    public List<Attendance> getAttendanceByStudentId(@PathVariable Long studentId) {
        return service.getAttendanceByStudentId(studentId);
    }

    @GetMapping("/date/{date}")
    public List<Attendance> getAttendanceByDate(@PathVariable LocalDate date) {
        return service.getAttendanceByDate(date);
    }

    @GetMapping("/percentage/{studentId}")
    public double getAttendancePercentage(@PathVariable Long studentId) {
        return service.getAttendancePercentage(studentId);
    }

    @DeleteMapping("/{id}")
    public String deleteAttendance(@PathVariable Long id) {
        service.deleteAttendance(id);
        return "Attendance deleted successfully!";
    }
    @PostMapping("/save-all")
    public String saveAllAttendance(@RequestBody List<AttendanceDTO> attendanceList) {

        service.saveAllAttendance(attendanceList);

        return "Attendance Saved Successfully";

    }
}