import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
//import { ForseekerService } from '../../forseeker.service';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
@Component({
  selector: 'app-emp-profile',
  templateUrl: './employeeprofile.component.html',
  styleUrls: ['./employeeprofile.component.css']
})
export class EmployeeprofileComponent implements OnInit {
  profileinfo: any;
  profilepic: any;
  picexists: boolean = false;
  EmpProfileForm: any;
  successmsg: any;
  constructor(private router: Router, private fb: FormBuilder,private seekerservice: EmployeeService) {
    this.EmpProfileForm = this.fb.group({
      // _id: this.seekerservice.getpayload().id,
      name: [''],
      email: ['', Validators.compose([Validators.email])],
      gender: [''],
      phone: [''],
      experience: [''], 
    });
   }

  ngOnInit() {
    this.getprofile();

  }
  getprofile() {
    this.seekerservice.getprofile().subscribe(
      (response: any) => {
        this.profileinfo = response;
        //this.userdata=response;
        //console.log(this.userdata);
        this.EmpProfileForm.patchValue({
          // _id: this.seekerservice.getpayload().id,
          name: this.profileinfo.name,
          email: this.profileinfo.email,
          gender: this.profileinfo.gender,
          phone: this.profileinfo.phone,
          interests: this.profileinfo.interests,
          experience: this.profileinfo.experience,
          location: this.profileinfo.location,
        });
        // this.EmpProfileForm.setValue({
        //   password: this.userdata.password
        // });

      }, (error:any) => {
        console.log("Server Error");
      }
    )
  }
  logout() {
    // this.seekerservice.logout();
    this.router.navigate(['login/emp_login']);
  }
  selectimage(event:any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.profilepic = file;
    }
  }
  upload() {
    const formdata = new FormData();
    formdata.append('profileimage', this.profilepic);
    // this.seekerservice.uploadprofilepic(formdata).subscribe((res) => {
    //   if (res) {
    //     this.successmsg = res
    //   }
    //   setTimeout(() => {
    //     this.successmsg = '';
    //     this.getprofile();
    //   }, 2000);

    //   // setTimeout(()=>{
    //   //   this.router.navigate(['/seeker/eprofile'])
    //   // },1000);
    //   this.router.navigate(['seeker/eprofile']);
    // }, (error) => {
    //   if (error) {
    //     console.log(error);
    //   }
    // })
  }

}
