package com.smarthire.smarthire_backend.dto;

public class AuthResponse {

    private String token;
    private String message;
    private String role; // ✅ Added Role Field

    public AuthResponse() {
    }

    // ✅ KEEP THIS (for login)
    public AuthResponse(String token) {
        this.token = token;
    }

    // ✅ OPTIONAL (for message-based responses)
    public AuthResponse(String token, String message) {
        this.token = token;
        this.message = message;
    }

    // ✅ NEW CONSTRUCTOR (Token + Message + Role)
    public AuthResponse(String token, String message, String role) {
        this.token = token;
        this.message = message;
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
