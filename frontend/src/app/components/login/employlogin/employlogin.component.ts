import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
// import { ForseekerService } from '../../../forseeker.service';
@Component({
  selector: 'app-employlogin',
  templateUrl: './employlogin.component.html',
  styleUrls: ['./employlogin.component.css']
})
export class EmployloginComponent implements OnInit {
  loginsuccess: any;
  loginfail:any;
  loginMessage=false;
  constructor(private router: Router,private fb:FormBuilder,private employeeService:EmployeeService) { }
  loginForm: FormGroup = this.fb.group({
    name: [null,Validators.required],
    password: [null,Validators.compose([Validators.required,Validators.minLength(5)])]
  });
  ngOnInit() {
  }
  moveToRegister() {
    this.router.navigate(['register/emp_register']);
  }
  login() {
    // this.router.navigate(['dashboard/jobs']);
    if (!this.loginForm.valid) {
      console.log('Invalid'); return;
    }
    console.log(JSON.stringify(this.loginForm.value.name));
    this.employeeService.login(this.loginForm.value)
      .subscribe(
        (response: any) => {
          console.log(response.success);
          if (response.success===1) {
            this.loginsuccess = "Login Success";
            localStorage.setItem('employeetoken',response.token);    
            this.loginForm.reset();
            setTimeout(() => {
              localStorage.setItem('name',response.name);
              this.router.navigate(['dashboard/jobs']);
            }, 2000);
          }
          else {
            this.loginfail ="invalid username/password";
          }
        },
        (error:any) => { console.log(error); }
      );
  }

  get form(){
    return this.loginForm.controls;
  }
  clearForm(){
    (<HTMLFormElement>document.getElementById("loginform")).reset();
   }



}
