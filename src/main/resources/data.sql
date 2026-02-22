-- Insert Default Roles
INSERT INTO roles (name) VALUES ('ROLE_ADMIN') ON DUPLICATE KEY UPDATE name='ROLE_ADMIN';
INSERT INTO roles (name) VALUES ('ROLE_REC') ON DUPLICATE KEY UPDATE name='ROLE_REC';
INSERT INTO roles (name) VALUES ('ROLE_USER') ON DUPLICATE KEY UPDATE name='ROLE_USER';
INSERT INTO roles (name) VALUES ('ROLE_CANDIDATE') ON DUPLICATE KEY UPDATE name='ROLE_CANDIDATE';

-- Insert Admin User (password is 'admin')
INSERT INTO users (full_name, email, password, role_id)
SELECT 'Admin User', 'admin@smarthire.com', '$2a$10$Y10K.i/yJv.y2Xf0g.r8I.06x6TqkI.kU1oR6V/k.2X.x/rX1i8D2', id FROM roles WHERE name='ROLE_ADMIN'
    ON DUPLICATE KEY UPDATE full_name='Admin User';

-- Insert Mock Jobs (Recruiter ID defaults to 1 for simplicity here, adjust if needed)
INSERT INTO jobs (title, description, company, location, rec_id, posted_date) VALUES 
('Frontend Developer', 'Looking for an experienced React developer.', 'TechCorp', 'San Francisco, CA', 1, '2023-11-20'),
('Backend Engineer', 'Java Spring Boot expert needed for scalable APIs.', 'CloudSphere', 'New York, NY', 1, '2023-11-21'),
('Full Stack Developer', 'MERN stack developer for dynamic web apps.', 'InnoSys', 'Remote', 1, '2023-11-22'),
('Data Scientist', 'Python and Machine Learning specialist.', 'DataWorks', 'Austin, TX', 1, '2023-11-23'),
('DevOps Engineer', 'AWS, Docker, and Kubernetes mastery required.', 'DeployNet', 'Seattle, WA', 1, '2023-11-24'),
('UI/UX Designer', 'Creative designer with Figma experience.', 'DesignHub', 'Remote', 1, '2023-11-25'),
('Product Manager', 'Lead agile teams and define product vision.', 'Visionary Inc', 'Chicago, IL', 1, '2023-11-26'),
('Mobile Developer', 'React Native or Flutter developer for iOS/Android.', 'Appify', 'Los Angeles, CA', 1, '2023-11-27'),
('QA Tester', 'Automated and manual testing experience.', 'QualityFirst', 'Boston, MA', 1, '2023-11-28'),
('Cybersecurity Analyst', 'Protect infrastructure and conduct audits.', 'SecureNet', 'Washington, DC', 1, '2023-11-29'),
('Database Administrator', 'Manage and optimize PostgreSQL clusters.', 'DataStorage Co', 'Denver, CO', 1, '2023-11-30'),
('Systems Analyst', 'Bridging business needs with IT solutions.', 'BizTech Solutions', 'Atlanta, GA', 1, '2023-12-01'),
('Marketing Technologist', 'Integrate marketing tools and analytics.', 'MarketMinds', 'Miami, FL', 1, '2023-12-02'),
('Cloud Architect', 'Design resilient multi-cloud infrastructures.', 'SkyHigh Tech', 'Remote', 1, '2023-12-03'),
('AI Engineer', 'Develop generative AI models and prompts.', 'FutureAI', 'San Jose, CA', 1, '2023-12-04'),
('Technical Writer', 'Create clear documentation for APIs.', 'DocuTech', 'Portland, OR', 1, '2023-12-05');
