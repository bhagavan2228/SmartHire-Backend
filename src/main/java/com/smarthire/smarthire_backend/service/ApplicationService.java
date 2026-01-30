package com.smarthire.smarthire_backend.service;

import org.springframework.stereotype.Service;

import com.smarthire.smarthire_backend.entity.Application;
import com.smarthire.smarthire_backend.entity.Job;
import com.smarthire.smarthire_backend.entity.User;
import com.smarthire.smarthire_backend.exception.ResourceNotFoundException;
import com.smarthire.smarthire_backend.repository.ApplicationRepository;
import com.smarthire.smarthire_backend.repository.JobRepository;
import com.smarthire.smarthire_backend.repository.UserRepository;
import com.smarthire.smarthire_backend.security.SecurityUtils;
@Service
public class ApplicationService {

    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;

    public ApplicationService(
            UserRepository userRepository,
            JobRepository jobRepository,
            ApplicationRepository applicationRepository) {

        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository;
    }

    public void applyToJob(Long jobId) {

        String email = SecurityUtils.getCurrentUserEmail();

    

        User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Job job = jobRepository.findById(jobId)
        .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        Application application = new Application();
        application.setUser(user);
        application.setJob(job);
        application.setStatus("APPLIED");

        applicationRepository.save(application);
    }
}
