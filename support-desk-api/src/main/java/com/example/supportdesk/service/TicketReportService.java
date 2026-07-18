package com.example.supportdesk.service;

import java.util.List;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.stereotype.Service;

import com.example.supportdesk.dto.ReportCountResponse;
import com.example.supportdesk.model.Ticket;

@Service
public class TicketReportService {

    private final MongoTemplate mongoTemplate;

    public TicketReportService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public List<ReportCountResponse> getTicketCountsByStatus() {
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.group("status").count().as("count"));

        AggregationResults<GroupResult> results = mongoTemplate.aggregate(
                aggregation, Ticket.class, GroupResult.class);

        return results.getMappedResults()
                .stream()
                .map(result -> new ReportCountResponse(result.getId(), result.getCount()))
                .toList();
    }

    // Shape MongoDB actually returns from a $group stage: the field grouped
    // on always comes back as "_id".
    private static class GroupResult {
        private String id;
        private long count;

        public String getId() {
            return id;
        }

        public long getCount() {
            return count;
        }
    }

    public List<ReportCountResponse> countTicketsByPriority() {
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.group("priority").count().as("count"));

        AggregationResults<GroupResult> results = mongoTemplate.aggregate(
                aggregation, Ticket.class, GroupResult.class);

        return results.getMappedResults()
                .stream()
                .map(result -> new ReportCountResponse(result.getId(), result.getCount()))
                .toList();
    }
}
