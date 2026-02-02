package com.smarthire.smarthire_backend.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.smarthire.smarthire_backend.dto.AuthResponse;
import com.smarthire.smarthire_backend.dto.LoginRequest;
import com.smarthire.smarthire_backend.dto.RegisterRequest;
import com.smarthire.smarthire_backend.entity.Role;
import com.smarthire.smarthire_backend.entity.User;
import com.smarthire.smarthire_backend.enums.RoleName;
import com.smarthire.smarthire_backend.exception.BadRequestException;
import com.smarthire.smarthire_backend.exception.ResourceNotFoundException;
import com.smarthire.smarthire_backend.repository.RoleRepository;
import com.smarthire.smarthire_backend.repository.UserRepository;
import com.smarthire.smarthire_backend.security.JwtService;

@Service
@Transactional
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthService(
            UserRepository userRepository,
            RoleRepository roleRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            AuthenticationManager authenticationManager) {

        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    // ✅ REGISTER
    public AuthResponse register(RegisterRequest request) {

        String email = request.getEmail().toLowerCase().trim();

        if (userRepository.findByEmail(email).isPresent()) {
            throw new BadRequestException("Email already exists");
        }

        Role role = roleRepository.findByName(RoleName.ROLE_CANDIDATE.name())
                .orElseThrow(() -> new ResourceNotFoundException("ROLE_CANDIDATE not found"));

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(role);

        userRepository.save(user);

        return new AuthResponse(null, "User registered successfully");
    }

    // ✅ LOGIN
    public AuthResponse login(LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()));

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        String token = jwtService.generateToken(request.getEmail());
        String role = user.getRole().getName();

        return new AuthResponse(token, "Login successful", role);
    }
}
