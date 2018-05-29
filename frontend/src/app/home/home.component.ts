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
  message: string = "";
  issue : Issue = {
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
      this.message = "Please Fill out the Form before submitting";
  }else{
    this.submitButton = true;
    this.issueService.addIssue(value).subscribe(
      data => {
        this.message = "Thank you for submitting an electrical issue"
      }, error=> {
        this.message = error.message;
        
      }
    )

  }

}
}