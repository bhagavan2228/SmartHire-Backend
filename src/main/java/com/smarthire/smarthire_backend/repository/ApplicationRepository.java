package com.smarthire.smarthire_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smarthire.smarthire_backend.entity.Application;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
}
