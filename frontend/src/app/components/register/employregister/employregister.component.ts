import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { Subscription } from 'rxjs';
//import { ForseekerService } from '../../../forseeker.service';
@Component({
  selector: 'app-employregister',
  templateUrl: './employregister.component.html',
  styleUrls: ['./employregister.component.css']
})
export class EmployregisterComponent implements OnInit {
  EmpRegisterForm:any;
  subscription: Subscription = new Subscription;
  registrationsuccess:any;
  regisfail:any;
  regisserver:any;
  constructor(private router:Router,private fb:FormBuilder,private employeeService:EmployeeService) { 
  }

  ngOnInit() {
    this.EmpRegisterForm=this.fb.group({
      name: ['',Validators.required],
      password: ['',Validators.compose([Validators.required,Validators.minLength(8)])],
      email:['',Validators.compose([Validators.required,Validators.email])],
      gender: ['',Validators.required],
      phone: ['',Validators.required],
      interests: ['',Validators.required],
      experience: ['',Validators.required],
      location: ['',Validators.required],
      });
  }
  registeremployee()
  {
    console.log(this.EmpRegisterForm.value);
    this.subscription=this.employeeService.employeeRegister(this.EmpRegisterForm.value).subscribe(
      (response:any)=>{
        if(response.success===1){
          this.registrationsuccess='Congratulations your now a job seeker';
          this.EmpRegisterForm.reset();
            setTimeout(() => {
              this.router.navigate(['/login/emp_login']);
            }, 3000);
        }else{
          this.regisfail='You are already a job seeker';
          console.log(this.regisfail);
        }
      },
      (error)=>{
          this.regisserver='Internal server error'; 
      }

    );
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
