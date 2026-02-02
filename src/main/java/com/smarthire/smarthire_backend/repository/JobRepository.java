package com.smarthire.smarthire_backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.smarthire.smarthire_backend.entity.Job;

public interface JobRepository extends JpaRepository<Job, Long> {

    // ✅ STEP 5.1: Filtering by title with pagination
    Page<Job> findByTitleContainingIgnoreCase(String title, Pageable pageable);
}
