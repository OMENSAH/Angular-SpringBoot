import { Component, EventEmitter, OnInit } from '@angular/core';
import { IssuesService } from '../services/issues.service';

import { DataSource } from '@angular/cdk/table';
import { Observable } from 'rxjs/Observable';
import { Issue } from '../models/issue';
import { MatDialog } from '@angular/material';
import { error } from 'protractor';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit{
  public message;
  public dataSource;
  displayedColumns = ['id', 'title', 'date_created', 'name_of_device'];

  constructor(private service: IssuesService) {}

  ngOnInit() {
    this.getIssues();
  }  

  getIssues(){
    return this.service.getIssues().subscribe(
      data => this.dataSource = data,
      error=> this.message = error.message
    )
  }
  
  
}


// getIssues(){
//   this.dataSource = new TableData(this.service);
// }


// }


// export class TableData extends DataSource<any>{
// constructor(private service: IssuesService){
//   super();
// }
// connect(): Observable<Issue[]>{
//   return this.service.getData();
// }
// disconnect(){}
// }

