import { Component, OnInit } from '@angular/core';
import { IssuesService } from '../services/issues.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-issue',
  templateUrl: './view-issue.component.html',
  styleUrls: ['./view-issue.component.css']
})
export class ViewIssueComponent implements OnInit {
  public issue;
  constructor(private route: ActivatedRoute, private issueService: IssuesService) { }

  ngOnInit() {
    this.getIssue(this.route.snapshot.params.id);
  }

  getIssue(id: number){
    this.issueService.getIssue(id).subscribe(
      data =>{
        this.issue = data
        console.log(this.issue);
      }, error =>{
        console.log(error)
      }
    )
  }
}
