package com.smarthire.smarthire_backend.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.smarthire.smarthire_backend.dto.AuthResponse;
import com.smarthire.smarthire_backend.dto.LoginRequest;
import com.smarthire.smarthire_backend.dto.RegisterRequest;
import com.smarthire.smarthire_backend.entity.Role;
import com.smarthire.smarthire_backend.entity.User;
import com.smarthire.smarthire_backend.enums.RoleName;
import com.smarthire.smarthire_backend.repository.RoleRepository;
import com.smarthire.smarthire_backend.repository.UserRepository;
import com.smarthire.smarthire_backend.security.JwtService;

import com.smarthire.smarthire_backend.exception.ResourceNotFoundException;
import com.smarthire.smarthire_backend.exception.BadRequestException;


@Service    
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

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new BadRequestException("Email already exists");

        }

        Role role = roleRepository.findByName(RoleName.ROLE_USER.name())
                .orElseThrow(() -> new ResourceNotFoundException("ROLE_USER not found"));


        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
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
                        request.getPassword())
        );

        // 🔥 FIXED: generate token using email (String)
        String token = jwtService.generateToken(request.getEmail());

        return new AuthResponse(token, "Login successful");
    }
}
