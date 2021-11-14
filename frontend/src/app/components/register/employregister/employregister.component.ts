import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
//import { ForseekerService } from '../../../forseeker.service';
@Component({
  selector: 'app-employregister',
  templateUrl: './employregister.component.html',
  styleUrls: ['./employregister.component.css']
})
export class EmployregisterComponent implements OnInit {

  constructor(private router:Router,private fb:FormBuilder) { }
  EmpRegisterForm:any;
  registrationsuccess:any;
  regisfail:any;
  regisserver:any;
  ngOnInit() {
    this.EmpRegisterForm=this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.compose([Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"),Validators.minLength(8)])],
      mail:['',Validators.compose([Validators.required,Validators.email])],
      gender: ['',Validators.required],
      mobile: ['',Validators.required],
      hometown: [''],
      interests: [''],
      experience: [''],
      maritalStatus: ['',Validators.required],
      nationality: [''],
      languages: [''],
      currentLocation: [''],
      lastjobexp: ['',Validators.required],
      lastjobDesig: ['',Validators.required],
      department: [''],
      reasonsforleaving: ['']
      });
  }
  registeremployee()
  {
   
  }

}
