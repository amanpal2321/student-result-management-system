package com.example.demo.controller;

import com.example.demo.entity.Result;
import com.example.demo.service.ResultService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/results")
@CrossOrigin
public class ResultController {

    private final ResultService service;

    public ResultController(ResultService service) {
        this.service = service;
    }

    @GetMapping
    public List<Result> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Result add(@RequestBody Result r) {
        return service.calculate(r);
    }

    @PutMapping("/{id}")
    public Result update(@PathVariable Long id, @RequestBody Result result) {
        try {
            return service.update(id, result);
        } catch (IllegalArgumentException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        try {
            service.delete(id);
        } catch (IllegalArgumentException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage());
        }
    }
}
