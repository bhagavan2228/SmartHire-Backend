package com.smarthire.smarthire_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smarthire.smarthire_backend.entity.Application;
import com.smarthire.smarthire_backend.entity.Job;
import com.smarthire.smarthire_backend.entity.User;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    boolean existsByUserAndJob(User user, Job job);

    // 🔹 ADD THIS LINE
    List<Application> findByUser(User user);
}
