package com.smarthire.smarthire_backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.smarthire.smarthire_backend.dto.JobResponseDto;
import com.smarthire.smarthire_backend.entity.Job;
import com.smarthire.smarthire_backend.exception.ResourceNotFoundException;
import com.smarthire.smarthire_backend.repository.JobRepository;

@Service
public class JobService {

    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    // ================= CREATE =================
    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    // ================= READ =================

    // GET ALL JOBS (non-paginated)
    public List<JobResponseDto> getAllJobs() {
        return jobRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    // GET JOB BY ID
    public JobResponseDto getJobById(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        return mapToDto(job);
    }

    // PAGINATED JOBS (STEP 4.2)
    public Page<JobResponseDto> getJobs(int page, int size) {
        Page<Job> jobPage = jobRepository.findAll(PageRequest.of(page, size));
        return jobPage.map(this::mapToDto);
    }

    // SEARCH JOBS + PAGINATION (STEP 5)
    public Page<JobResponseDto> searchJobs(String title, int page, int size) {
        Page<Job> jobPage =
                jobRepository.findByTitleContainingIgnoreCase(
                        title,
                        PageRequest.of(page, size)
                );

        return jobPage.map(this::mapToDto);
    }

    // ================= DELETE =================

    // DELETE JOB (ADMIN ONLY)
    public void deleteJob(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        jobRepository.delete(job);
    }

    // ================= DTO MAPPER =================
    private JobResponseDto mapToDto(Job job) {
        JobResponseDto dto = new JobResponseDto();
        dto.setId(job.getId());
        dto.setTitle(job.getTitle());
        dto.setDescription(job.getDescription());
        dto.setLocation(job.getLocation());
        return dto;
    }
}
