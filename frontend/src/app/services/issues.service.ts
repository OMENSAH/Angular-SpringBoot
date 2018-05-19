import { Injectable } from '@angular/core';
import { Issue } from '../models/issue';
import { HttpClient, HttpHeaders}  from '@angular/common/http'
import { Observable }   from 'rxjs/Observable';

@Injectable()
export class IssuesService {
  constructor(private http: HttpClient) { }

  getIssues(){
    return this.http.get("/server/api/issues");
  }

  getIssue(id: number){
    return  this.http.get(`/server/api/issues/${id}`);

  }

  addIssue(issue: Issue){
    let body = JSON.stringify(issue);
    return this.http.post("/server/api/issues", body, {headers: new HttpHeaders({'Content-Type': 'application/json'})});

  }

  // getData(): Observable<Issue[]>{
  //   return this.http.get<Issue[]>("/server/api/issues");
  // }
}



  