package dev.rajesh.portfolio.chat;

import org.springframework.http.HttpStatus;

public class ChatException extends RuntimeException {
    private final HttpStatus status;
    private final String code;
    public ChatException(HttpStatus status, String message, String code) { super(message); this.status = status; this.code = code; }
    public HttpStatus status() { return status; }
    public String code() { return code; }
}
