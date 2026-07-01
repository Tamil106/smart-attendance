package com.attendance.smartattendance.dto;

public class StudentAttendanceDTO {

    private String name;
    private double percentage;

    public StudentAttendanceDTO() {
    }

    public StudentAttendanceDTO(String name, double percentage) {
        this.name = name;
        this.percentage = percentage;
    }

    // Getter for name
    public String getName() {
        return name;
    }

    // Setter for name
    public void setName(String name) {
        this.name = name;
    }

    // Getter for percentage
    public double getPercentage() {
        return percentage;
    }

    // Setter for percentage
    public void setPercentage(double percentage) {
        this.percentage = percentage;
    }

}