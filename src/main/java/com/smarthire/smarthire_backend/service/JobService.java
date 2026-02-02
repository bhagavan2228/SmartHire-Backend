package com.smarthire.smarthire_backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.smarthire.smarthire_backend.dto.JobResponseDto;
import com.smarthire.smarthire_backend.entity.Job;
import com.smarthire.smarthire_backend.exception.BadRequestException;
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

        if (job == null) {
            throw new BadRequestException("Job must not be null");
        }

        return jobRepository.save(job);
    }

    // ================= READ =================

    // GET ALL JOBS
    public List<JobResponseDto> getAllJobs() {
        return jobRepository.findAll()
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    // GET JOB BY ID
    public JobResponseDto getJobById(Long id) {

        if (id == null) {
            throw new BadRequestException("Job ID must not be null");
        }

        Job job = jobRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Job not found"));

        return mapToDto(job);
    }

    // PAGINATED JOBS
    public Page<JobResponseDto> getJobs(int page, int size) {

        if (page < 0 || size <= 0) {
            throw new BadRequestException("Invalid page or size value");
        }

        return jobRepository
                .findAll(PageRequest.of(page, size))
                .map(this::mapToDto);
    }

    // SEARCH JOBS
    public Page<JobResponseDto> searchJobs(String title, int page, int size) {

        if (title == null || title.isBlank()) {
            throw new BadRequestException("Search title must not be empty");
        }

        if (page < 0 || size <= 0) {
            throw new BadRequestException("Invalid page or size value");
        }

        return jobRepository
                .findByTitleContainingIgnoreCase(
                        title,
                        PageRequest.of(page, size))
                .map(this::mapToDto);
    }

    // ================= DELETE =================

    // DELETE JOB (WARNING-FREE VERSION)
    public void deleteJob(Long id) {

        if (id == null) {
            throw new BadRequestException("Job ID must not be null");
        }

        if (!jobRepository.existsById(id)) {
            throw new ResourceNotFoundException("Job not found");
        }

        jobRepository.deleteById(id);
    }

    // ================= DTO MAPPER =================
    private JobResponseDto mapToDto(Job job) {

        if (job == null) {
            throw new BadRequestException("Job entity must not be null");
        }

        JobResponseDto dto = new JobResponseDto();
        dto.setId(job.getId());
        dto.setTitle(job.getTitle());
        dto.setDescription(job.getDescription());
        dto.setLocation(job.getLocation());
        return dto;
    }
}
