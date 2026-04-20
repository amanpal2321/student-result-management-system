package com.example.demo.repository;

import com.example.demo.entity.Result;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResultRepository extends JpaRepository<Result, Long> {
    long countByGradeNot(String grade);
}
