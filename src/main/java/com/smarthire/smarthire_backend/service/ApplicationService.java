package com.smarthire.smarthire_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smarthire.smarthire_backend.entity.Application;
import com.smarthire.smarthire_backend.entity.Job;
import com.smarthire.smarthire_backend.entity.User;
import com.smarthire.smarthire_backend.exception.BadRequestException;
import com.smarthire.smarthire_backend.exception.ResourceNotFoundException;
import com.smarthire.smarthire_backend.repository.ApplicationRepository;
import com.smarthire.smarthire_backend.repository.JobRepository;
import com.smarthire.smarthire_backend.repository.UserRepository;

@Service
@Transactional
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public ApplicationService(
            ApplicationRepository applicationRepository,
            JobRepository jobRepository,
            UserRepository userRepository,
            NotificationService notificationService) {

        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
    }

    // =========================
    // USER: Apply for a Job
    // =========================
    public void applyToJob(Long jobId, String userEmail) {

        // 🔒 Null safety checks
        if (jobId == null) {
            throw new BadRequestException("Job ID must not be null");
        }

        if (userEmail == null || userEmail.isBlank()) {
            throw new BadRequestException("User email must not be empty");
        }

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        boolean alreadyApplied = applicationRepository.existsByUserAndJob(user, job);

        if (alreadyApplied) {
            throw new BadRequestException("You have already applied for this job");
        }

        Application application = new Application();
        application.setUser(user);
        application.setJob(job);
        application.setStatus("APPLIED");

        applicationRepository.save(application);
    }

    // =========================
    // USER: View My Applications
    // =========================
    public List<Application> getMyApplications(String userEmail) {

        if (userEmail == null || userEmail.isBlank()) {
            throw new BadRequestException("User email must not be empty");
        }

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return applicationRepository.findByUser(user);
    }

    // =========================
    // ADMIN / RECRUITER: View All Applications
    // =========================
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    // =========================
    // ADMIN / RECRUITER: Update Application Status
    // =========================
    public void updateStatus(Long id, String status) {

        if (id == null) {
            throw new BadRequestException("Application ID must not be null");
        }

        if (status == null || status.isBlank()) {
            throw new BadRequestException("Status must not be empty");
        }

        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found"));

        application.setStatus(status.toUpperCase());
        Application savedApplication = applicationRepository.save(application);

        // 🚀 FIRE REAL-TIME EVENT
        notificationService.sendToUser(
                savedApplication.getUser().getId(),
                "APPLICATION_STATUS_UPDATED",
                savedApplication);
    }
}
