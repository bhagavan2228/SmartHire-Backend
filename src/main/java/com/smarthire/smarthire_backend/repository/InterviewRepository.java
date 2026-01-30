package com.smarthire.smarthire_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smarthire.smarthire_backend.entity.Interview;

public interface InterviewRepository extends JpaRepository<Interview, Long> {
}
