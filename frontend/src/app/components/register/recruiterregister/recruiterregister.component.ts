import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder,FormControl,FormGroup,Validators} from '@angular/forms';
import { RecruiterService } from 'src/app/services/recruiter.service';
import { Subscription } from 'rxjs';
//import { ForrecruiterService } from '../../../forrecruiter.service';
@Component({
  selector: 'app-recruiterregister',
  templateUrl: './recruiterregister.component.html',
  styleUrls: ['./recruiterregister.component.css']
})
export class RecruiterregisterComponent implements OnInit {
  subscription: Subscription = new Subscription;
  RecruiterRegisterForm:any;
  registrationsuccess:any;
  regisfail:any;
  regisserver:any;
  
  constructor(private router:Router,private fb:FormBuilder,private recruiterService:RecruiterService){ }
 
  ngOnInit() {
    this.RecruiterRegisterForm=this.fb.group({
      companyName: ['',Validators.required],
      password: ['',Validators.compose([Validators.required,Validators.minLength(8)])],
      email:['',Validators.compose([Validators.required,Validators.email])],
      experience: ['',Validators.required],
      About: ['']
      });
  }
  register_rectuiter()
  {
   this.subscription= this.recruiterService.recruiterRegister(this.RecruiterRegisterForm.value).subscribe(
      (response:any)=>{
        console.log(response.success);
        if(response.success===1){
          this.registrationsuccess='your are successfully registered as Recruiter';
          this.RecruiterRegisterForm.reset();
            setTimeout(() => {
              this.router.navigate(['/login/rec_login']);
            }, 4000);
        }else{
          this.regisfail='You are already a job Giver';
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
