package com.attendance.smartattendance.dto;

public class DepartmentChartDTO {

    private String department;
    private long present;
    private long absent;

    public DepartmentChartDTO() {
    }

    public DepartmentChartDTO(String department, long present, long absent) {
        this.department = department;
        this.present = present;
        this.absent = absent;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public long getPresent() {
        return present;
    }

    public void setPresent(long present) {
        this.present = present;
    }

    public long getAbsent() {
        return absent;
    }

    public void setAbsent(long absent) {
        this.absent = absent;
    }
}