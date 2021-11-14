import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
//import { ForrecruiterService } from '../../../forrecruiter.service';
@Component({
  selector: 'app-recruiterregister',
  templateUrl: './recruiterregister.component.html',
  styleUrls: ['./recruiterregister.component.css']
})
export class RecruiterregisterComponent implements OnInit {

  constructor(private router:Router,private fb:FormBuilder){ }
  RecruiterRegisterForm:any;
  registrationsuccess:any;
  regisfail:any;
  regisserver:any;
  ngOnInit() {
    this.RecruiterRegisterForm=this.fb.group({
      companyName: ['',Validators.required],
      password: ['',Validators.compose([Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"),Validators.minLength(8)])],
      companyMail:['',Validators.compose([Validators.required,Validators.email])],
      industryType:['',Validators.required],
      yearsofExp: [''],
      About: ['',Validators.required]
      });
  }
  register_rectuiter()
  {
    this.router.navigate(['dashboard/jobs'])
    
  }

}
