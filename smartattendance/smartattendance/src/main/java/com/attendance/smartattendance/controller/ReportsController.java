package com.attendance.smartattendance.controller;

import com.attendance.smartattendance.dto.StudentAttendanceDTO;
import com.attendance.smartattendance.service.ReportsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/reports")
@CrossOrigin("*")
public class ReportsController {

    @Autowired
    private ReportsService reportsService;

    @GetMapping("/department-report")
    public Map<String, List<StudentAttendanceDTO>> getDepartmentReport() {

        return reportsService.getDepartmentReport();

    }

}