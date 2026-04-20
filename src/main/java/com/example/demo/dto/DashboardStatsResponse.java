package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardStatsResponse {
    private long totalStudents;
    private long resultsGenerated;
    private long passedStudents;
    private double passPercentage;
    private double averageScore;
}
