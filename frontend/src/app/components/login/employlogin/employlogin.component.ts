import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
// import { ForseekerService } from '../../../forseeker.service';
@Component({
  selector: 'app-employlogin',
  templateUrl: './employlogin.component.html',
  styleUrls: ['./employlogin.component.css']
})
export class EmployloginComponent implements OnInit {
  loginsuccess: any;
  loginfail: any;
  constructor(private router: Router,private fb:FormBuilder) { }
  loginForm: FormGroup = this.fb.group({
    username: [null,Validators.required],
    password: [null,Validators.compose([Validators.required,Validators.minLength(5)])]
  });
  ngOnInit() {
  }
  moveToRegister() {
    this.router.navigate(['register/emp_register']);
  }
  login() {
    this.router.navigate(['dashboard/jobs']);

  }
  getform(){
    return this.loginForm.controls;
  }




}
