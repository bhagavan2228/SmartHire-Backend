package com.smarthire.smarthire_backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(@NonNull MessageBrokerRegistry config) {
        // Carry messages back to the client on destinations prefixed with /topic
        config.enableSimpleBroker("/topic", "/queue");

        // Prefix for messages BOUND for methods annotated with @MessageMapping
        config.setApplicationDestinationPrefixes("/app");
        // Prefix for user-specific messaging matching User objects
        config.setUserDestinationPrefix("/user");
    }

    @Override
    public void registerStompEndpoints(@NonNull StompEndpointRegistry registry) {
        // The endpoint the frontend client will connect to: /ws
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*") // Allow frontend connections
                .withSockJS(); // Fallback to SockJS if WebSockets are not supported
    }
}
