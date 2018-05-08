import { Component, EventEmitter } from '@angular/core';
import { IssuesService } from '../services/issues.service';

import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { Issue } from '../models/issue';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  providers:[IssuesService]
})
export class AdminDashboardComponent {


  constructor(private service: IssuesService) {
  
  }
  displayedColumns = ['date_posted', 'title', 'category', 'delete'];
  dataSource = new PostDataSource(this.service);
  
}





export class PostDataSource extends DataSource<any>{
  constructor(private service: IssuesService){
    super();
  }
  connect(): Observable<Issue[]>{
    return this.service.getData();
  }
  disconnect(){}
}

