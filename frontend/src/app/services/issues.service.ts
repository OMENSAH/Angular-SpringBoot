import { Injectable } from '@angular/core';
import { Issue } from '../models/issue';
import { HttpClient, HttpHeaders}  from '@angular/common/http'
import { Observable }   from 'rxjs/Observable';

@Injectable()
export class IssuesService {
  constructor(private http: HttpClient) { }

  getIssues(){
    let token = localStorage.getItem('access_token');
    return this.http.get("/server/api/issues", 
    // {headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)}
  );
  }

  getIssue(id: number){
    let token = localStorage.getItem('access_token');
    return  this.http.get(`/server/api/issues/${id}`,
    // {headers: new HttpHeaders().set('Authorization', 'Bearer ' + token)}
  );

  }

  addIssue(issue: Issue){
    let body = JSON.stringify(issue);
    console.log(body)
    return this.http.post("/server/api/issues", body, 
    {headers: new HttpHeaders({'Content-Type': 'application/json'})}
  );
  }

  // getData(): Observable<Issue[]>{
  //   return this.http.get<Issue[]>("/server/api/issues");
  // }
}



  