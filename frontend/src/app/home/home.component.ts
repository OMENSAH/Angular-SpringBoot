import { Component, OnInit } from '@angular/core';
import { IssuesService } from '../services/issues.service';
import { Issue } from '../models/issue';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  issue : Issue = {
    id: 0,
    title: "",
    body: "",
    date_created: new Date,
    reporter_name: "",
    name_of_device: ""
  }
  submitButton: boolean;
  constructor(
    private issueService: IssuesService,
    private router: Router
  ) { }
  ngOnInit() {
    this.submitButton = false;
  }
  
  onSubmit({value, valid}:{value:Issue, valid:boolean}){
    if(!valid){
      // this.flashMessagesService.show("Please Fill in All Fields", {cssClass:"alert-danger", timeout:4000});
      this.router.navigate(['/']);
  }else{
    this.submitButton = true;
    this.issueService.addIssue(value);
    // this.flashMessagesService.show('New  client Successfully added', {cssClass:"alert-success", timeout:4000});
    this.router.navigate(['/']);
  }

}
}