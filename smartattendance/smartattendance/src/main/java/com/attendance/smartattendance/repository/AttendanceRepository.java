package com.attendance.smartattendance.repository;

import com.attendance.smartattendance.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    boolean existsByStudentIdAndDate(Long studentId, LocalDate date);

    List<Attendance> findByStudentId(Long studentId);

    List<Attendance> findByDate(LocalDate date);

    long countByStudentId(Long studentId);

    long countByStudentIdAndStatus(Long studentId, String status);

    long countByDate(LocalDate date);

    long countByDateAndStatus(LocalDate date, String status);

    Optional<Attendance> findByStudentIdAndDate(Long studentId, LocalDate date);

    long countByStudentIdInAndStatus(List<Long> studentIds, String status);

}