package com.smarthire.smarthire_backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smarthire.smarthire_backend.entity.Application;
import com.smarthire.smarthire_backend.service.ApplicationService;

@RestController
@RequestMapping("/api/admin/applications")
public class AdminApplicationController {

    private final ApplicationService applicationService;

    public AdminApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @GetMapping
    public List<Application> getAllApplications() {
        return applicationService.getAllApplications();
    }

    // 🔹 ADD THIS METHOD
    @PutMapping("/{id}/status")
    public String updateApplicationStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        applicationService.updateStatus(id, status);
        return "Application status updated";
    }
}
