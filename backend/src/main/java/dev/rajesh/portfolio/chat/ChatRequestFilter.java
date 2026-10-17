package dev.rajesh.portfolio.chat;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ReadListener;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletInputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;
import jakarta.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import static dev.rajesh.portfolio.chat.ChatDtos.ErrorResponse;

@Component
public class ChatRequestFilter extends OncePerRequestFilter {
    private final Set<String> allowedOrigins;
    private final ObjectMapper mapper;
    private final RequestRateLimiter limiter;
    public ChatRequestFilter(@Value("${portfolio.allowed-origins:}") String origins, ObjectMapper mapper, RequestRateLimiter limiter) { this.allowedOrigins = Arrays.stream(origins.split(",")).map(String::trim).filter(value -> !value.isEmpty()).collect(Collectors.toSet()); this.mapper = mapper; this.limiter = limiter; }
    @Override protected boolean shouldNotFilter(HttpServletRequest request) { return !request.getRequestURI().equals("/api/chat"); }
    @Override protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        response.setHeader("Cache-Control", "no-store"); response.setHeader("X-Content-Type-Options", "nosniff");
        if (!request.getMethod().equals("POST")) { response.setHeader("Allow", "POST"); error(response, 405, "Use POST to send a question.", "METHOD"); return; }
        String origin = request.getHeader("Origin"), site = request.getHeader("Sec-Fetch-Site");
        String ownOrigin = request.getRequestURL().toString().replaceFirst("/api/chat$", "");
        if (origin == null || (!origin.equals(ownOrigin) && !allowedOrigins.contains(origin)) || "cross-site".equals(site)) { error(response, 403, "Please send questions from this portfolio.", "ORIGIN"); return; }
        if (request.getContentType() == null || !request.getContentType().split(";", 2)[0].trim().equalsIgnoreCase("application/json")) { error(response, 415, "Send a JSON message.", "CONTENT_TYPE"); return; }
        if (request.getContentLengthLong() > 18000) { error(response, 413, "That conversation is too long. Start a new chat.", "BODY_SIZE"); return; }
        byte[] body = request.getInputStream().readNBytes(18001);
        if (body.length > 18000) { error(response, 413, "That conversation is too long. Start a new chat.", "BODY_SIZE"); return; }
        // Do not trust visitor-supplied forwarding headers as rate-limit identities.
        if (!limiter.allow(request.getRemoteAddr())) { response.setHeader("Retry-After", "60"); error(response, 429, "A few too many questions at once. Please try again in a minute.", "RATE_LIMIT"); return; }
        var wrapped = new HttpServletRequestWrapper(request) {
            @Override public ServletInputStream getInputStream() {
                var stream = new ByteArrayInputStream(body);
                return new ServletInputStream() {
                    @Override public boolean isFinished() { return stream.available() == 0; }
                    @Override public boolean isReady() { return true; }
                    @Override public void setReadListener(ReadListener listener) { throw new UnsupportedOperationException("Async body reading is not supported"); }
                    @Override public int read() { return stream.read(); }
                    @Override public int read(byte[] bytes, int offset, int length) { return stream.read(bytes, offset, length); }
                };
            }
        };
        chain.doFilter(wrapped, response);
    }
    private void error(HttpServletResponse response, int status, String message, String code) throws IOException { response.setStatus(status); response.setContentType("application/json"); response.setCharacterEncoding(StandardCharsets.UTF_8.name()); mapper.writeValue(response.getOutputStream(), new ErrorResponse(message, code)); }
}
