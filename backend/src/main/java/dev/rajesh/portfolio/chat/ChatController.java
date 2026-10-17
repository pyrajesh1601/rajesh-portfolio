package dev.rajesh.portfolio.chat;

import jakarta.validation.Valid;
import java.util.Map;
import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import static dev.rajesh.portfolio.chat.ChatDtos.*;

@RestController
public class ChatController {
    private final ChatService service;
    private final GeminiClient client;
    public ChatController(ChatService service, GeminiClient client) { this.service = service; this.client = client; }
    @PostMapping(value = "/api/chat", consumes = "application/json", produces = "application/json")
    public ResponseEntity<ChatResponse> chat(@Valid @RequestBody ChatRequest request) { return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(new ChatResponse(service.answer(request.messages()))); }
    @GetMapping("/api/health")
    public ResponseEntity<Map<String, Object>> health() { return ResponseEntity.ok().cacheControl(CacheControl.noStore()).body(Map.of("status", "ok", "backend", "spring-boot", "geminiConfigured", client.configured())); }
}
