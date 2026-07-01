package com.attendance.smartattendance.controller;

import com.attendance.smartattendance.dto.DepartmentChartDTO;
import com.attendance.smartattendance.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.attendance.smartattendance.dto.WeeklyAttendanceDTO;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin("*")
public class DashboardController {

    @Autowired
    private DashboardService service;

    @GetMapping
    public Map<String, Long> getDashboardStats() {
        return service.getDashboardStats();
    }

    @GetMapping("/chart")
    public List<DepartmentChartDTO> getDepartmentChart() {
        return service.getDepartmentChart();
    }

    @GetMapping("/weekly-chart")
    public List<WeeklyAttendanceDTO> getWeeklyChart(){

        return service.getWeeklyChart();

    }

}