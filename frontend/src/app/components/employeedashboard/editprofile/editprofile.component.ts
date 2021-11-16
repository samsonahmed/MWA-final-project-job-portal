import { Component, OnInit } from '@angular/core';
//import { ForseekerService } from '../../forseeker.service';
import { Router } from '@angular/router';
import {first} from "rxjs/operators";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecruiterService } from 'src/app/services/recruiter.service';
import { EmployeeService } from 'src/app/services/employee.service';
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  profileinfo: any;
  EmpProfileForm: any;
  updated: any;
  userdata:any={};
  constructor(private router: Router, private fb: FormBuilder,private seekerservice:EmployeeService) { 
    this.EmpProfileForm = this.fb.group({
      // _id: this.seekerservice.getpayload().id,
      name: [''],
      password: ['', Validators.compose([Validators.minLength(8),Validators.required])],
      email: ['', Validators.compose([Validators.email])],
      gender: [''],
      phone: [''],
      interests: [''],
      experience: [''],
      location: ['']    
    });
  }

  ngOnInit() {
    this.getprofile();
  }
  getprofile() {
    this.seekerservice.getprofile().subscribe(
      (response: any) => {
        this.profileinfo = response;
        this.userdata=response;
        console.log(this.userdata);
        this.EmpProfileForm.patchValue({
          // _id: this.seekerservice.getpayload().id,
          name: this.userdata.name,
          email: this.userdata.email,
          gender: this.userdata.gender,
          phone: this.userdata.phone,
          interests: this.userdata.interests,
          experience: this.userdata.experience,
          location: this.userdata.location,
        });
        this.EmpProfileForm.setValue({
          password: this.userdata.password
        });

      }, (error:any) => {
        console.log("Server Error");
      }
    )
  }

  updateprofile() {
    // this.EmpProfileForm.patchValue({
    //   _id: this.seekerservice.getpayload().id,
    //   name: this.userdata.username,
    //   password: this.userdata.password,
    //   mail: this.userdata.mail,
    //   gender: this.userdata.gender,
    //   mobile: this.userdata.mobile,
    //   hometown: this.userdata.hometown,
    //   interests: this.userdata.interests,
    //   experience: this.userdata.experience,
    //   maritalStatus: this.userdata.maritalStatus,
    //   nationality: this.userdata.nationality,
    //   languages: this.userdata.languages,
    //   currentLocation: this.userdata.currentLocation,
    //   lastjobexp: this.userdata.lastjobexp,
    //   lastjobDesig: this.userdata.lastjobDesig,
    //   department: this.userdata.department,
    //   reasonsforleaving: this.userdata.reasonsforleaving

    // });
    this.seekerservice.empupdateprofile(this.EmpProfileForm.value).subscribe((response) => {

      this.updated = response;
     // localStorage.setItem('currentemployee',this.EmpProfileForm.value.username);
      //this.EmpProfileForm.setValue(response);
      this.router.navigate(['seeker/eprofile'])
      console.log(this.EmpProfileForm.value.name);
    },
      (error:any) => {
        console.log(error);
      })
  }
  
}
