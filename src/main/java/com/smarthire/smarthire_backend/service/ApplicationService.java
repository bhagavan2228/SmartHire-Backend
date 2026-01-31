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

    public ApplicationService(
            ApplicationRepository applicationRepository,
            JobRepository jobRepository,
            UserRepository userRepository) {

        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
    }

    // ✅ USER: Apply for job
    public void applyToJob(Long jobId, String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Job not found"));

        boolean alreadyApplied =
                applicationRepository.existsByUserAndJob(user, job);

        if (alreadyApplied) {
            throw new BadRequestException("You have already applied for this job");
        }

        Application application = new Application();
        application.setUser(user);
        application.setJob(job);
        application.setStatus("APPLIED");

        applicationRepository.save(application);
    }

    // ✅ USER: View my applications
    public List<Application> getMyApplications(String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() ->
                        new ResourceNotFoundException("User not found"));

        return applicationRepository.findByUser(user);
    }

    // ✅ ADMIN: View all applications
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    // ✅ ADMIN: Update application status
    public void updateStatus(Long id, String status) {

        Application application = applicationRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Application not found"));

        application.setStatus(status);
        applicationRepository.save(application);
    }
}
