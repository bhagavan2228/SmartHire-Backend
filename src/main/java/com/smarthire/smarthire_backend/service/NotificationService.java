package com.smarthire.smarthire_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@SuppressWarnings("null")
public class NotificationService {

    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public NotificationService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    /**
     * Sends a real-time notification to a specific user.
     * The frontend client should subscribe to /user/{userId}/queue/notifications
     *
     * @param userId    The ID of the user (Candidate or Recruiter)
     * @param eventType The type of event (e.g., NEW_APPLICATION,
     *                  APPLICATION_STATUS_UPDATED)
     * @param payload   Additional data associated with the event
     */
    public void sendToUser(Long userId, String eventType, Object payload) {
        Map<String, Object> message = new HashMap<>();
        message.put("type", eventType);
        message.put("payload", payload);
        message.put("timestamp", System.currentTimeMillis());

        // Send to /user/{userId}/queue/notifications
        messagingTemplate.convertAndSendToUser(
                String.valueOf(userId),
                "/queue/notifications",
                message);
    }

    /**
     * Broadcasts a message to all subscribers of a specific topic.
     * Useful for global events like a new feature announcement or system
     * maintenance.
     */
    public void broadcastToTopic(String topic, String eventType, Object payload) {
        Map<String, Object> message = new HashMap<>();
        message.put("type", eventType);
        message.put("payload", payload);
        message.put("timestamp", System.currentTimeMillis());

        messagingTemplate.convertAndSend(topic, message);
    }
}
