/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package electricalissues.backend.repositories;

import electricalissues.backend.model.Issue;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author olive
 */
public interface IssuesRepository extends JpaRepository<Issue, Long> {
    
}
