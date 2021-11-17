import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { RecruiterService } from 'src/app/services/recruiter.service';

@Component({
  selector: 'app-recruiterlogin',
  templateUrl: './recruiterlogin.component.html',
  styleUrls: ['./recruiterlogin.component.css']
})
export class RecruiterloginComponent implements OnInit {
  loginsuccess: any;
  loginfail: any;
  constructor(private router: Router,private fb:FormBuilder,private recruiterService:RecruiterService) { }
  loginForm: FormGroup = this.fb.group({
    companyName: [null,Validators.required],
    password: [null,Validators.compose([Validators.required,Validators.minLength(5)])]
  });
  ngOnInit() {
  }
  moveToRegister() {
    this.router.navigate(['register/rec_register']);
  }
  login() {
    if (!this.loginForm.valid) {
      console.log('Invalid'); return;
    }
    console.log(JSON.stringify(this.loginForm.value. companyName));
    this.recruiterService.login(this.loginForm.value)
      .subscribe(
        (response: any) => {
          if (response.success===1) {
            this.loginsuccess = "Login Success";
            localStorage.setItem('recruitertoken',response.token);
            console.log(response.token);
            this.loginForm.reset();
            setTimeout(() => { 
              localStorage.setItem('name',response.name);
              this.router.navigate(['rdashboard/postedjobs']);
            }, 3000);
          }
          else {
            this.loginfail = "Invalid Username/Password";
          }
        },
        (error:any) => { console.log(error); }
      );
  }
  get form(){
    return this.loginForm.controls;
  }
}
