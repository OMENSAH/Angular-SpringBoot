/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package electricalissues.backend.controllers;

import electricalissues.backend.model.Issue;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author olive
 */
@RestController
@RequestMapping("/api/issues")
public class IssuesController {
    List<Issue> issues = new ArrayList<>();
    
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void create(@RequestBody Issue issue) {
        issues.add(issue);
    }
        
    @GetMapping 
    public List<Issue> getIssues(){
        return issues;
    }
    
    @GetMapping("/{id}")
    public Issue findOne(@PathVariable long id) {
        return new Issue();
    }
}
