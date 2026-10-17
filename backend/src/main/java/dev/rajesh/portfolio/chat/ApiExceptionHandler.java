package dev.rajesh.portfolio.chat;

import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.http.converter.HttpMessageNotReadableException;
import static dev.rajesh.portfolio.chat.ChatDtos.ErrorResponse;

@RestControllerAdvice
public class ApiExceptionHandler {
    @ExceptionHandler(ChatException.class)
    public ResponseEntity<ErrorResponse> chat(ChatException error) {
        var builder = ResponseEntity.status(error.status()).cacheControl(CacheControl.noStore());
        if (error.status().value() == 429) builder.header("Retry-After", "60");
        return builder.body(new ErrorResponse(error.getMessage(), error.code()));
    }
    @ExceptionHandler({MethodArgumentNotValidException.class, HttpMessageNotReadableException.class})
    public ResponseEntity<ErrorResponse> invalid(Exception error) { return ResponseEntity.badRequest().cacheControl(CacheControl.noStore()).body(new ErrorResponse("Please enter a valid question, or start a new chat.", "INVALID_MESSAGES")); }
}
