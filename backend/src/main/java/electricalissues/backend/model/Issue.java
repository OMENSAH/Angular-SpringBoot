/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package electricalissues.backend.model;

import java.util.Date;

/**
 *
 * @author olive
 */
public class Issue {
    private int id;
    private String title;
    private String body;
    private Date date_created;
    private String resporter_name;
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

    public Date getDate_created() {
        return date_created;
    }

    public void setDate_created(Date date_created) {
        this.date_created = date_created;
    }

    public String getResporter_name() {
        return resporter_name;
    }

    public void setResporter_name(String resporter_name) {
        this.resporter_name = resporter_name;
    }

    public String getName_of_device() {
        return name_of_device;
    }

    public void setName_of_device(String name_of_device) {
        this.name_of_device = name_of_device;
    }
}
