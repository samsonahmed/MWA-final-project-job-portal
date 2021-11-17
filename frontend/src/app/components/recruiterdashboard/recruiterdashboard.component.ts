import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { RecruiterService } from 'src/app/services/recruiter.service';
//import {ForrecruiterService} from '../../forrecruiter.service';
@Component({
  selector: 'app-rdashboard',
  templateUrl: './recruiterdashboard.component.html',
  styleUrls: ['./recruiterdashboard.component.css']
})
export class RecruiterdashboardComponent implements OnInit {

  constructor(private router:Router,private activeroute:ActivatedRoute,private recruiterService:RecruiterService) { }
  companyName:any;
  ngOnInit() {
   this.companyName=this.recruiterService.getpayload()
  }
  logoutRecruiter()
  {
    this.recruiterService.logout();
    this.router.navigate(['login/rec_login'],)
  }
  applied_Employees()
  {
    this.router.navigate(['applied'],{relativeTo:this.activeroute});
  }
  posted_jobs()
  {
    this.router.navigate(['postedjobs'],{relativeTo:this.activeroute});
  }
  gotoprofilepage()
  {
    this.router.navigate(['recruiter/rprofile']);
  }

}
