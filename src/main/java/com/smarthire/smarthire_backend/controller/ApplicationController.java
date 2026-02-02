package com.smarthire.smarthire_backend.controller;

import java.util.List;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smarthire.smarthire_backend.entity.Application;
import com.smarthire.smarthire_backend.service.ApplicationService;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping("/apply")
    public String applyToJob(
            @RequestParam Long jobId,
            @AuthenticationPrincipal UserDetails userDetails) {

        applicationService.applyToJob(jobId, userDetails.getUsername());
        return "Applied successfully";
    }

    // 🔹 ADD THIS METHOD
    @GetMapping("/my")
    public List<Application> getMyApplications(
            @AuthenticationPrincipal UserDetails userDetails) {

        return applicationService.getMyApplications(
                userDetails.getUsername());
    }
}
