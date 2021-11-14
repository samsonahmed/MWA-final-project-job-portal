import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router:Router,private activatedroute:ActivatedRoute) { }
  tabset:boolean=false;

  ngOnInit() {
  }
  employeeregisterpage()
  {
    this.router.navigate(['emp_register'],{relativeTo:this.activatedroute});
    this.tabset=true;
  }
  recruiterregisterpage()
  {
    this.router.navigate(['rec_register'],{relativeTo:this.activatedroute});
    this.tabset=true;
  }
}
