package dev.rajesh.portfolio.chat;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.net.httpserver.HttpServer;
import java.net.InetSocketAddress;
import java.net.URI;
import java.net.http.HttpClient;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicReference;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import static dev.rajesh.portfolio.chat.ChatDtos.Message;

class GeminiClientTest {
    final ObjectMapper mapper = new ObjectMapper();
    final AtomicReference<String> body = new AtomicReference<>("{\"candidates\":[{\"content\":{\"parts\":[{\"text\":\"PostgreSQL.\"}]}}]}");
    final AtomicInteger status = new AtomicInteger(200);
    final AtomicReference<JsonNode> requestBody = new AtomicReference<>();
    final AtomicReference<String> keyHeader = new AtomicReference<>();
    HttpServer server; GeminiClient client;
    @BeforeEach void setup() throws Exception {
        server = HttpServer.create(new InetSocketAddress("127.0.0.1", 0), 0);
        server.createContext("/models/gemini-test:generateContent", exchange -> {
            requestBody.set(mapper.readTree(exchange.getRequestBody())); keyHeader.set(exchange.getRequestHeaders().getFirst("x-goog-api-key"));
            byte[] bytes = body.get().getBytes(StandardCharsets.UTF_8); exchange.getResponseHeaders().set("Content-Type", "application/json"); exchange.sendResponseHeaders(status.get(), bytes.length); exchange.getResponseBody().write(bytes); exchange.close();
        });
        server.start(); client = new GeminiClient(mapper, "server-only-test-key", "gemini-test", URI.create("http://127.0.0.1:" + server.getAddress().getPort() + "/models/"), HttpClient.newHttpClient());
    }
    @AfterEach void cleanup() { server.stop(0); }
    @Test void sendsTrustedInstructionAndCorrectConversationRoles() {
        String answer = client.answer(List.of(new Message("user", "Fitforge?"), new Message("assistant", "A fitness backend."), new Message("user", "Database?")), "Use only verified facts.");
        assertEquals("PostgreSQL.", answer); assertEquals("server-only-test-key", keyHeader.get());
        assertEquals("model", requestBody.get().path("contents").path(1).path("role").asText());
        assertEquals("Use only verified facts.", requestBody.get().path("systemInstruction").path("parts").path(0).path("text").asText());
        assertFalse(requestBody.get().path("store").asBoolean());
    }
    @Test void providerAccessErrorDoesNotLeakRawResponse() {
        status.set(403); body.set("{\"error\":{\"message\":\"server-only-test-key private provider detail\"}}");
        var error = assertThrows(ChatException.class, () -> client.answer(List.of(new Message("user", "Skills?")), "Verified profile"));
        assertEquals(503, error.status().value()); assertFalse(error.getMessage().contains("test-key")); assertFalse(error.getMessage().contains("provider detail"));
    }
    @Test void providerQuotaGetsFriendlyRateLimit() { status.set(429); var error = assertThrows(ChatException.class, () -> client.answer(List.of(new Message("user", "Skills?")), "Verified profile")); assertEquals(429, error.status().value()); }
    @Test void emptyProviderOutputDoesNotFabricateAnswer() { body.set("{\"candidates\":[]}"); var error = assertThrows(ChatException.class, () -> client.answer(List.of(new Message("user", "Skills?")), "Verified profile")); assertEquals("EMPTY_ANSWER", error.code()); }
    @Test void missingKeyMakesNoProviderRequest() { var empty = new GeminiClient(mapper, "", "gemini-test"); assertThrows(ChatException.class, () -> empty.answer(List.of(new Message("user", "Hi")), "Facts")); assertNull(requestBody.get()); }
}
