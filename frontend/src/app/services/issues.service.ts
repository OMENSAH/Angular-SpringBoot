import { Injectable } from '@angular/core';
import { Issue } from '../models/issue';
import { HttpClient, HttpHeaders}  from '@angular/common/http'
import { Observable }   from 'rxjs/Observable';

@Injectable()
export class IssuesService {
  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get("/server/api/issues");
  }
  // getData(): Observable<Issue[]>{
  //   return this.http.get<Issue[]>("/server/api/issues");
  // }
}



  