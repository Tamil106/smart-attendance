package com.attendance.smartattendance.dto;

public class WeeklyAttendanceDTO {

    private String day;
    private long present;

    public WeeklyAttendanceDTO() {
    }

    public WeeklyAttendanceDTO(String day, long present) {
        this.day = day;
        this.present = present;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public long getPresent() {
        return present;
    }

    public void setPresent(long present) {
        this.present = present;
    }
}