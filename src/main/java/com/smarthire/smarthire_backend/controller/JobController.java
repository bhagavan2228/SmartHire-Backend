package com.smarthire.smarthire_backend.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.smarthire.smarthire_backend.dto.JobResponseDto;
import com.smarthire.smarthire_backend.entity.Job;
import com.smarthire.smarthire_backend.service.JobService;

@RestController
@RequestMapping("/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    // ================= USER ACCESS =================

    // GET ALL JOBS (non-paginated)
    @GetMapping
    public List<JobResponseDto> getAllJobs() {
        return jobService.getAllJobs();
    }

    // GET JOB BY ID
    @GetMapping("/{id}")
    public JobResponseDto getJobById(@PathVariable Long id) {
        return jobService.getJobById(id);
    }

    // PAGINATED JOBS
    @GetMapping("/paged")
    public Page<JobResponseDto> getJobsPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        return jobService.getJobs(page, size);
    }

    // SEARCH JOBS + PAGINATION
    @GetMapping("/search")
    public Page<JobResponseDto> searchJobs(
            @RequestParam String title,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {

        return jobService.searchJobs(title, page, size);
    }

    // ================= ADMIN ACCESS =================

    // CREATE JOB (ADMIN ONLY)
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Job createJob(@RequestBody Job job) {
        return jobService.createJob(job);
    }

    // DELETE JOB (ADMIN ONLY) – optional but recommended
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
    }
}
