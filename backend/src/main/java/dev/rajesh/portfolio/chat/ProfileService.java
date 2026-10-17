package dev.rajesh.portfolio.chat;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {
    private final String instruction;
    public ProfileService(ObjectMapper mapper) {
        try {
            String rules = new ClassPathResource("assistant-instructions.txt").getContentAsString(StandardCharsets.UTF_8);
            String profile = new ClassPathResource("profile.json").getContentAsString(StandardCharsets.UTF_8);
            instruction = rules + "\nVerified profile:\n" + mapper.writeValueAsString(mapper.readTree(profile));
        } catch (IOException error) { throw new IllegalStateException("Unable to load the verified profile."); }
    }
    public String instruction() { return instruction; }
}
