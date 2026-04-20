package com.example.demo.service;

import com.example.demo.entity.Result;
import com.example.demo.repository.ResultRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResultService {

    private final ResultRepository resultRepository;

    public ResultService(ResultRepository resultRepository) {
        this.resultRepository = resultRepository;
    }

    public List<Result> getAll() {
        return resultRepository.findAll();
    }

    public Result calculate(Result r) {
        normalizeResult(r);
        return resultRepository.save(applyGrade(r));
    }

    public Result update(Long id, Result updatedResult) {
        Result existingResult = resultRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Result not found."));

        existingResult.setStudentName(updatedResult.getStudentName().trim());
        existingResult.setMarks1(updatedResult.getMarks1());
        existingResult.setMarks2(updatedResult.getMarks2());
        existingResult.setMarks3(updatedResult.getMarks3());

        normalizeResult(existingResult);
        return resultRepository.save(applyGrade(existingResult));
    }

    public void delete(Long id) {
        Result existingResult = resultRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Result not found."));
        resultRepository.delete(existingResult);
    }

    private void normalizeResult(Result result) {
        result.setStudentName(result.getStudentName().trim());
    }

    private Result applyGrade(Result r) {
        int total = r.getMarks1() + r.getMarks2() + r.getMarks3();
        r.setTotal(total);

        if (total >= 240) {
            r.setGrade("A");
        } else if (total >= 180) {
            r.setGrade("B");
        } else {
            r.setGrade("C");
        }
        return r;
    }

    public long countResults() {
        return resultRepository.count();
    }

    public long countPassedStudents() {
        return resultRepository.countByGradeNot("C");
    }

    public double calculateAverageScore() {
        List<Result> results = resultRepository.findAll();
        if (results.isEmpty()) {
            return 0;
        }

        return results.stream()
                .mapToInt(Result::getTotal)
                .average()
                .orElse(0);
    }
}
