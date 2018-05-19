/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package electricalissues.backend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author olive
 */
@Entity
@Table(name="Issues")
public class Issue {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id", nullable=false, unique=true)
    private int id;
    
    @Column(name="title", nullable=false)
    private String title;
    
    @Column(name="body", nullable=false)
    private String body;
    
    @Column(name="date_created", nullable=false)
    private String date_created;
     
    @Column(name="reporter_name", nullable=false)
    private String reporter_name;
    
    @Column(name="name_of_device", nullable=false)
    private String name_of_device;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getDate_created() {
        return date_created;
    }

    public void setDate_created(String date_created) {
        this.date_created = date_created;
    }

    public String getReporter_name() {
        return reporter_name;
    }

    public void setReporter_name(String reporter_name) {
        this.reporter_name = reporter_name;
    }

    public String getName_of_device() {
        return name_of_device;
    }

    public void setName_of_device(String name_of_device) {
        this.name_of_device = name_of_device;
    }
}
