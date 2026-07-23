package com.example.AssetTracker;

import java.time.Instant;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.supportdesk.model.Ticket;
import com.example.supportdesk.repository.TicketRepository;

@SpringBootApplication
public class AssetTrackerApplication {
    private Instant createdAt;

    public Instant getCreatedAt() {     // ← return type Instant
    return createdAt;
}

public void setCreatedAt(Instant createdAt) {   // ← parameter Instant
    this.createdAt = createdAt;
}
    public static void main(String[] args) {
        SpringApplication.run(AssetTrackerApplication.class, args);
    }

    @Bean
    CommandLineRunner testMongo(TicketRepository repo) {
        return args -> {
            long countBefore = repo.count();
            System.out.println("[SmokeTest] Tickets in DB before: " + countBefore);

            Ticket t = new Ticket();
            t.setTitle("Smoke test ticket");
            t.setDescription("Inserted from CommandLineRunner");
            t.setCategory("Test");
            t.setPriority("Low");
            t.setStatus("Open");
t.setCreatedAt(Instant.now().toString());
            t.setCreatedAt(Instant.now().toString());

            Ticket saved = repo.save(t);
            System.out.println("[SmokeTest] Saved ticket id: " + saved.getId());

            long countAfter = repo.count();
            System.out.println("[SmokeTest] Tickets in DB after: " + countAfter);

            repo.findAll().forEach(ticket ->
                System.out.println("[SmokeTest] Found: " + ticket.getTitle())
            );
        };
    }
}
