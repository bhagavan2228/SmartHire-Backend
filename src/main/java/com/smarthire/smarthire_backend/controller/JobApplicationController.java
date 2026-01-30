package com.smarthire.smarthire_backend.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smarthire.smarthire_backend.entity.Job;
import com.smarthire.smarthire_backend.entity.JobApplication;
import com.smarthire.smarthire_backend.entity.User;
import com.smarthire.smarthire_backend.repository.JobApplicationRepository;
import com.smarthire.smarthire_backend.repository.JobRepository;
import com.smarthire.smarthire_backend.repository.UserRepository;

@SuppressWarnings("null")
@RestController
@RequestMapping("/applications")
public class JobApplicationController {

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JobRepository jobRepository;

    // Test endpoint
    @GetMapping("/test")
    public String test() {
        return "Controller working";
    }

    // Apply for job (NEW WAY using relationships)
    @PostMapping("/{userId}/{jobId}")
    public JobApplication applyForJob(@PathVariable Long userId,
                                      @PathVariable Long jobId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        JobApplication application = new JobApplication();
        application.setUser(user);
        application.setJob(job);
        application.setAppliedDate(LocalDate.now());

        return jobApplicationRepository.save(application);
    }

    // Get all applications
    @GetMapping
    public List<JobApplication> getAllApplications() {
        return jobApplicationRepository.findAll();
    }

    // Get applications by user
    @GetMapping("/user/{userId}")
    public List<JobApplication> getByUser(@PathVariable Long userId) {
        return jobApplicationRepository.findAll()
                .stream()
                .filter(app -> app.getUser().getId().equals(userId))
                .collect(Collectors.toList());
    }

    // Get applications by job
    @GetMapping("/job/{jobId}")
    public List<JobApplication> getByJob(@PathVariable Long jobId) {
        return jobApplicationRepository.findAll()
                .stream()
                .filter(app -> app.getJob().getId().equals(jobId))
                .collect(Collectors.toList());
    }
}
