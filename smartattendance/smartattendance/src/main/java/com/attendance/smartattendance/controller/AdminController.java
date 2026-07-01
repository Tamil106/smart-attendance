package com.attendance.smartattendance.controller;

import com.attendance.smartattendance.entity.Admin;
import com.attendance.smartattendance.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private AdminService service;

    @PostMapping("/login")
    public String login(@RequestBody Admin admin) {
        return service.login(admin);
    }
}