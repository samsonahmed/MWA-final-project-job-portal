import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
// import {ForseekerService} from '../../forseeker.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router:Router,private activeroute:ActivatedRoute) { }
  username:any;
  ngOnInit() {
    this.username=localStorage.getItem('currentemployee');
  }
  logoutemployee()
  {
    // this.seekerservie.logout();
    this.router.navigate(['login/emp_login'],)
  }
  jobs()
  {
    this.router.navigate(['jobs'],{relativeTo:this.activeroute});
  }
  appliedjobs()
  {
   console.log("Inside applied job")
    this.router.navigate(['appliedjobs'],{relativeTo:this.activeroute});
    console.log("after applied")
  }
  gotoprofilepage()
  {
    this.router.navigate(['seeker/eprofile']);
  }

}
