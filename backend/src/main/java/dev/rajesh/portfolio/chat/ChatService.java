package dev.rajesh.portfolio.chat;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import static dev.rajesh.portfolio.chat.ChatDtos.Message;

@Service
public class ChatService {
    private final ProfileService profile;
    private final GeminiClient client;
    public ChatService(ProfileService profile, GeminiClient client) { this.profile = profile; this.client = client; }
    public String answer(List<Message> messages) { validate(messages); return client.answer(messages, profile.instruction()); }
    static void validate(List<Message> messages) {
        if (messages == null || messages.isEmpty() || messages.size() > 13 || messages.size() % 2 == 0) invalid();
        int total = 0;
        for (int i = 0; i < messages.size(); i++) {
            var message = messages.get(i);
            if (message == null || !(i % 2 == 0 ? "user" : "assistant").equals(message.role()) || message.content() == null || message.content().isBlank() || message.content().length() > (i % 2 == 0 ? 1200 : 5000)) invalid();
            total += message.content().length();
        }
        if (total > 14000) invalid();
    }
    private static void invalid() { throw new ChatException(HttpStatus.BAD_REQUEST, "Please enter a question of up to 1,200 characters, or start a new chat.", "INVALID_MESSAGES"); }
}
