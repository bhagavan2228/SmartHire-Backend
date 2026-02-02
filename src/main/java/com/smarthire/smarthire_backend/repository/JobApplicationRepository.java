package com.smarthire.smarthire_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smarthire.smarthire_backend.entity.JobApplication;

public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
}
