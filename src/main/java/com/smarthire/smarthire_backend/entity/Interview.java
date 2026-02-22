package com.smarthire.smarthire_backend.entity;

import com.smarthire.smarthire_backend.enums.InterviewStatus;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "interviews")
public class Interview {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne
	@JoinColumn(name = "application_id", nullable = false)
	private Application application;

	@Enumerated(EnumType.STRING)
	private InterviewStatus status;

	private LocalDateTime date;
	private String type; // ONLINE, ONSITE

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Application getApplication() {
		return application;
	}

	public void setApplication(Application application) {
		this.application = application;
	}

	public InterviewStatus getStatus() {
		return status;
	}

	public void setStatus(InterviewStatus status) {
		this.status = status;
	}

	public LocalDateTime getDate() {
		return date;
	}

	public void setDate(LocalDateTime date) {
		this.date = date;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Interview(Long id, Application application, InterviewStatus status, LocalDateTime date, String type) {
		super();
		this.id = id;
		this.application = application;
		this.status = status;
		this.date = date;
		this.type = type;
	}

	public Interview() {
		super();
		// TODO Auto-generated constructor stub
	}

}
