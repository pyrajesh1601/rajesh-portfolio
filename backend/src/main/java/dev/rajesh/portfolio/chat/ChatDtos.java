package dev.rajesh.portfolio.chat;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import java.util.List;

public final class ChatDtos {
    private ChatDtos() {}
    public record Message(@NotBlank @Pattern(regexp = "user|assistant") String role,
                          @NotBlank @Size(max = 5000) String content) {}
    public record ChatRequest(@NotEmpty @Size(max = 13) List<@Valid Message> messages) {}
    public record ChatResponse(String answer) {}
    public record ErrorResponse(String error, String code) {}
}
