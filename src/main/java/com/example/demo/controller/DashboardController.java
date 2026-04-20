package com.example.demo.controller;

import com.example.demo.dto.DashboardStatsResponse;
import com.example.demo.service.ResultService;
import com.example.demo.service.StudentService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin
public class DashboardController {

    private final StudentService studentService;
    private final ResultService resultService;

    public DashboardController(StudentService studentService, ResultService resultService) {
        this.studentService = studentService;
        this.resultService = resultService;
    }

    @GetMapping("/stats")
    public DashboardStatsResponse getStats() {
        long totalStudents = studentService.countStudents();
        long resultsGenerated = resultService.countResults();
        long passedStudents = resultService.countPassedStudents();
        double passPercentage = resultsGenerated == 0 ? 0 : (passedStudents * 100.0) / resultsGenerated;
        double averageScore = resultService.calculateAverageScore();

        return new DashboardStatsResponse(
                totalStudents,
                resultsGenerated,
                passedStudents,
                Math.round(passPercentage * 100.0) / 100.0,
                Math.round(averageScore * 100.0) / 100.0
        );
    }
}
