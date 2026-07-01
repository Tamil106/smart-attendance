package com.attendance.smartattendance.service;

import com.attendance.smartattendance.entity.Student;
import com.attendance.smartattendance.entity.Attendance;
import com.attendance.smartattendance.repository.AttendanceRepository;
import com.attendance.smartattendance.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.attendance.smartattendance.dto.DepartmentChartDTO;
import java.util.ArrayList;
import java.util.List;
import com.attendance.smartattendance.dto.WeeklyAttendanceDTO;
import java.time.DayOfWeek;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Service
public class DashboardService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private AttendanceService attendanceService;

    public Map<String, Long> getDashboardStats() {

        LocalDate today = LocalDate.now();

        Map<String, Long> stats = new HashMap<>();

        stats.put("totalStudents", studentRepository.count());

        stats.put(
                "presentToday",
                attendanceRepository.countByDateAndStatus(today, "Present")
        );

        stats.put(
                "absentToday",
                attendanceRepository.countByDateAndStatus(today, "Absent")
        );

        stats.put(
                "totalAttendance",
                attendanceRepository.count()
        );

        // Low Attendance Count
        long lowAttendanceCount = 0;

        for (Student student : studentRepository.findAll()) {

            double percentage =
                    attendanceService.getAttendancePercentage(student.getId());

            if (percentage < 75) {
                lowAttendanceCount++;
            }

        }

        stats.put("lowAttendanceCount", lowAttendanceCount);

        return stats;
    }

    public List<DepartmentChartDTO> getDepartmentChart() {

        List<DepartmentChartDTO> chart = new ArrayList<>();

        LocalDate today = LocalDate.now();

        String[] departments = {"CSE", "AIDS"};

        for (String department : departments) {

            List<Student> students =
                    studentRepository.findByDepartment(department);

            long present = 0;
            long absent = 0;

            for (Student student : students) {

                List<Attendance> attendance =
                        attendanceRepository.findByStudentId(student.getId());

                for (Attendance a : attendance) {

                    if (a.getDate().equals(today)) {

                        if (a.getStatus().equals("Present"))
                            present++;

                        else
                            absent++;
                    }

                }

            }

            chart.add(new DepartmentChartDTO(
                    department,
                    present,
                    absent
            ));
        }

        return chart;
    }
    public List<WeeklyAttendanceDTO> getWeeklyChart() {

        List<WeeklyAttendanceDTO> list = new ArrayList<>();

        LocalDate today = LocalDate.now();

        LocalDate monday = today.with(DayOfWeek.MONDAY);

        for(int i=0;i<7;i++){

            LocalDate date = monday.plusDays(i);

            long present =
                    attendanceRepository.countByDateAndStatus(date,"Present");

            list.add(
                    new WeeklyAttendanceDTO(
                            date.getDayOfWeek().toString().substring(0,3),
                            present
                    )
            );
        }

        return list;
    }
}