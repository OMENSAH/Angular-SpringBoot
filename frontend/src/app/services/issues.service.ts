import { Injectable } from '@angular/core';
import { Issue } from '../models/issue';
import { HttpClient, HttpHeaders}  from '@angular/common/http'


@Injectable()
export class IssuesService {
  constructor(private http: HttpClient) { }

  getIssues(){
     return this.http.get("/server/api/issues", 
     {headers: new HttpHeaders().set('Authorization', 'Bearer '+ localStorage.getItem('access_token'))}
    );
  }

  getIssue(id: number){
    return  this.http.get(`/server/api/issues/${id}`, 
      {headers: new HttpHeaders().set('Authorization',  'Bearer '+ localStorage.getItem('access_token'))}
    );
  }

  addIssue(issue: Issue){
    let body = JSON.stringify(issue);
    console.log(body)
    return this.http.post("/server/api/issues", body, 
    {headers: new HttpHeaders({'Content-Type': 'application/json'})}
  );
  }
}

