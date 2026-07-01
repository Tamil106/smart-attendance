package com.attendance.smartattendance.service;

import com.attendance.smartattendance.entity.Attendance;
import com.attendance.smartattendance.repository.AttendanceRepository;
import com.attendance.smartattendance.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.attendance.smartattendance.dto.AttendanceDTO;

import java.util.List;
import java.time.LocalDate;
import java.util.Optional;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository repository;

    @Autowired
    private StudentRepository studentRepository;

    public Attendance markAttendance(Attendance attendance) {

        if (!studentRepository.existsById(attendance.getStudentId())) {
            throw new RuntimeException("Student not found!");
        }

        if (repository.existsByStudentIdAndDate(
                attendance.getStudentId(),
                attendance.getDate())) {

            throw new RuntimeException("Attendance already marked for today!");
        }

        return repository.save(attendance);
    }

    public List<Attendance> getAllAttendance() {
        return repository.findAll();
    }
    public List<Attendance> getAttendanceByStudentId(Long studentId) {
        return repository.findByStudentId(studentId);
    }
    public List<Attendance> getAttendanceByDate(LocalDate date) {
        return repository.findByDate(date);
    }
    public double getAttendancePercentage(Long studentId) {

        long total = repository.countByStudentId(studentId);

        long present = repository.countByStudentIdAndStatus(studentId, "Present");

        if (total == 0) {
            return 0;
        }

        return (present * 100.0) / total;
    }
    public void deleteAttendance(Long id) {
        repository.deleteById(id);
    }
    public void saveAllAttendance(List<AttendanceDTO> attendanceList) {

        for (AttendanceDTO dto : attendanceList) {

            Optional<Attendance> existingAttendance =
                    repository.findByStudentIdAndDate(
                            dto.getStudentId(),
                            dto.getDate()
                    );

            if (existingAttendance.isPresent()) {

                Attendance attendance = existingAttendance.get();

                attendance.setStatus(dto.getStatus());

                repository.save(attendance);

            } else {

                Attendance attendance = new Attendance();

                attendance.setStudentId(dto.getStudentId());

                attendance.setDate(dto.getDate());

                attendance.setStatus(dto.getStatus());

                repository.save(attendance);

            }

        }
    }
}