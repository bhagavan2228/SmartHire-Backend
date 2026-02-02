package com.smarthire.smarthire_backend.entity;

import com.smarthire.smarthire_backend.enums.InterviewStatus;
import jakarta.persistence.*;

@Entity
@Table(name = "interviews")
public class Interview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "job_application_id", nullable = false)
    private JobApplication jobApplication;

    @Enumerated(EnumType.STRING)
    private InterviewStatus status;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public JobApplication getJobApplication() {
		return jobApplication;
	}

	public void setJobApplication(JobApplication jobApplication) {
		this.jobApplication = jobApplication;
	}

	public InterviewStatus getStatus() {
		return status;
	}

	public void setStatus(InterviewStatus status) {
		this.status = status;
	}

	public Interview(Long id, JobApplication jobApplication, InterviewStatus status) {
		super();
		this.id = id;
		this.jobApplication = jobApplication;
		this.status = status;
	}

	public Interview() {
		super();
		// TODO Auto-generated constructor stub
	}
    
}
