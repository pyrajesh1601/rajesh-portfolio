package dev.rajesh.portfolio.chat;

import java.time.Clock;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicBoolean;
import org.springframework.stereotype.Component;

@Component
public class RequestRateLimiter {
    private record Bucket(int count, long reset) {}
    private final ConcurrentHashMap<String, Bucket> buckets = new ConcurrentHashMap<>();
    private final Clock clock;
    public RequestRateLimiter() { this(Clock.systemUTC()); }
    RequestRateLimiter(Clock clock) { this.clock = clock; }
    public boolean allow(String key) {
        long now = clock.millis(); buckets.entrySet().removeIf(entry -> entry.getValue().reset < now);
        if (buckets.size() > 2000) return false;
        var allowed = new AtomicBoolean(false);
        buckets.compute(key, (ignored, old) -> { var current = old == null || old.reset <= now ? new Bucket(0, now + 60000) : old; if (current.count >= 12) return current; allowed.set(true); return new Bucket(current.count + 1, current.reset); });
        return allowed.get();
    }
}
