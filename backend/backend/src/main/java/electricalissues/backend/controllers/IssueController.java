/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package electricalissues.backend.controllers;

import electricalissues.backend.model.Issue;
import electricalissues.backend.repositories.IssuesRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
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
public class IssueController {
    
   @Autowired
   private IssuesRepository issueRepository;
    
    @PostMapping 
    @ResponseStatus(HttpStatus.CREATED)
    public void addIssue(@RequestBody Issue issue){
        issueRepository.save(issue);
    }
    
    @GetMapping 
    public List<Issue> getIssues(){
        return issueRepository.findAll();
    }
    
    @GetMapping("/{id}")
    public Issue getIssue(@PathVariable("id") long id) {
	return issueRepository.getOne(id);
    } 
}
