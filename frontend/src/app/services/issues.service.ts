import { Injectable } from '@angular/core';
import { Issue } from '../models/issue';
import { Observable }   from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class IssuesService {

  ELEMENT_DATA: Issue[] = [];
  constructor() { }

  getData(): Observable<Issue[]> {
    
    return  Observable.of<Issue[]>(this.ELEMENT_DATA);
  }

}



  