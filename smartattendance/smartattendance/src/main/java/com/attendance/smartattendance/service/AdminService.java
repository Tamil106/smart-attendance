package com.attendance.smartattendance.service;

import com.attendance.smartattendance.entity.Admin;
import com.attendance.smartattendance.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private AdminRepository repository;

    public String login(Admin admin) {

        Admin existingAdmin = repository.findByUsernameAndPassword(
                admin.getUsername(),
                admin.getPassword());

        if (existingAdmin != null) {
            return "Login Successful";
        } else {
            return "Invalid Username or Password";
        }
    }
}