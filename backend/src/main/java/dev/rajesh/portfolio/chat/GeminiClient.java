package dev.rajesh.portfolio.chat;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpTimeoutException;
import java.time.Duration;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import static dev.rajesh.portfolio.chat.ChatDtos.Message;

@Service
public class GeminiClient {
    private final ObjectMapper mapper;
    private final HttpClient client;
    private final String key;
    private final String model;
    private final URI base;
    @Autowired
    public GeminiClient(ObjectMapper mapper, @Value("${gemini.api-key:}") String key, @Value("${gemini.model:gemini-3.8-flash}") String model) {
        this(mapper, key, model, URI.create("https://generativelanguage.googleapis.com/v1beta/models/"), HttpClient.newBuilder().connectTimeout(Duration.ofSeconds(10)).followRedirects(HttpClient.Redirect.NEVER).build());
    }
    GeminiClient(ObjectMapper mapper, String key, String model, URI base, HttpClient client) { this.mapper = mapper; this.key = key.trim(); this.model = model; this.base = base; this.client = client; }
    public boolean configured() { return !key.isBlank(); }
    public String answer(List<Message> messages, String instruction) {
        if (!configured()) throw new ChatException(HttpStatus.SERVICE_UNAVAILABLE, "The assistant is not configured yet. You can still reach Rajesh by email.", "NOT_CONFIGURED");
        if (!model.matches("gemini-[a-z0-9.-]+")) throw new ChatException(HttpStatus.SERVICE_UNAVAILABLE, "The assistant configuration needs attention.", "CONFIGURATION");
        try {
            var contents = messages.stream().map(m -> Map.of("role", m.role().equals("assistant") ? "model" : "user", "parts", List.of(Map.of("text", m.content().trim())))).toList();
            var payload = Map.of("systemInstruction", Map.of("parts", List.of(Map.of("text", instruction))), "contents", contents, "generationConfig", Map.of("temperature", .3, "maxOutputTokens", 1000), "store", false);
            var request = HttpRequest.newBuilder(URI.create(base + model + ":generateContent")).timeout(Duration.ofSeconds(30)).header("Content-Type", "application/json").header("x-goog-api-key", key).POST(HttpRequest.BodyPublishers.ofString(mapper.writeValueAsString(payload))).build();
            var response = client.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() == 429) throw new ChatException(HttpStatus.TOO_MANY_REQUESTS, "Gemini’s request limit was reached. Please try again later or contact Rajesh directly.", "PROVIDER_LIMIT");
            if (List.of(400, 401, 403).contains(response.statusCode())) throw new ChatException(HttpStatus.SERVICE_UNAVAILABLE, "The assistant’s API access needs attention. Please contact Rajesh directly.", "PROVIDER_ACCESS");
            if (response.statusCode() < 200 || response.statusCode() >= 300) throw new ChatException(HttpStatus.BAD_GATEWAY, "The assistant is temporarily unavailable. Please try again shortly.", "PROVIDER_ERROR");
            JsonNode result = mapper.readTree(response.body());
            var answer = new StringBuilder();
            for (JsonNode part : result.path("candidates").path(0).path("content").path("parts")) if (part.path("text").isTextual() && !part.path("thought").asBoolean(false)) { if (!answer.isEmpty()) answer.append('\n'); answer.append(part.path("text").asText()); }
            String text = answer.toString().trim();
            if (text.isEmpty()) throw new ChatException(HttpStatus.BAD_GATEWAY, "I couldn’t form an answer to that question. Try asking about a project or skill.", "EMPTY_ANSWER");
            return text.substring(0, Math.min(text.length(), 5000));
        } catch (HttpTimeoutException error) { throw new ChatException(HttpStatus.BAD_GATEWAY, "The answer took too long. Please try again.", "TIMEOUT"); }
        catch (InterruptedException error) { Thread.currentThread().interrupt(); throw new ChatException(HttpStatus.BAD_GATEWAY, "The answer was interrupted. Please try again.", "INTERRUPTED"); }
        catch (IOException error) { throw new ChatException(HttpStatus.BAD_GATEWAY, "The assistant could not connect. Please try again shortly.", "CONNECTION"); }
    }
}
