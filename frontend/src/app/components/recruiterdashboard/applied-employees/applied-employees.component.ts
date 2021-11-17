import { Component, OnInit } from '@angular/core';
import{Router,ActivatedRoute,ParamMap} from '@angular/router';
import { RecruiterService } from 'src/app/services/recruiter.service';
//import{ForrecruiterService} from '../../../forrecruiter.service';
@Component({
  selector: 'app-applied-employees',
  templateUrl: './applied-employees.component.html',
  styleUrls: ['./applied-employees.component.css']
})
export class AppliedEmployeesComponent implements OnInit {
  headers=['SeekerName','SeekerMail','SeekerMobile','SeekerLoc','Interests','AppliedFor',' '];
  seekersInfo:any=[];
  seekerinterest:any;
  applied:any;
  sent:any;
  errormsg:any;
  constructor(private router:Router,private activeroute:ActivatedRoute,private recruiterService:RecruiterService) { }

  ngOnInit() {
  //  setTimeout(()=>{
  //   this.getSeekers();
  //  },5000);
   this.getSeekers();
  }
getSeekers()
{
  this.recruiterService.getseekers().subscribe(
    (response:any)=>{
      if(response.length > 0)
      {
        console.log(response);
        this.seekersInfo=response;
      //  // this.seekerinterest=response.employeearray.details.interests;
      //  console.log("this is check point "+this.seekersInfo.name);
      //   console.log(this.seekersInfo);
      }
      else{
        this.applied=true;
        //console.log(this.notapplied);
      }

    },(error:any)=>{
      this.errormsg="Internal Server Error/Server Issues";
    }
  )
}
call_for_interview(info:any){
  this.recruiterService.send(info).subscribe((response:any)=>{
    if(response){
     this.sent="Email is sent";
     setTimeout(()=>{
       this.sent='';
       this.getSeekers();
     },2000)
    }
   else{
    this.sent="Email is not sent";
    setTimeout(()=>{
      this.sent='';
      this.getSeekers();
    },2000)
   } 
  })
}
reject(info:any){
  this.recruiterService.send(info).subscribe((response:any)=>{
    if(response){
     this.sent="Email is sent";
     setTimeout(()=>{
       this.sent='';
       this.getSeekers();
     },2000)
    }
   else{
    this.sent="Email is not sent";
    setTimeout(()=>{
      this.sent='';
      this.getSeekers();
    },2000)
   } 
  })
}
}
