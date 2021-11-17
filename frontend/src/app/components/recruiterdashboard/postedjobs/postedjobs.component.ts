import { Component, OnInit } from '@angular/core';
import{Router,ActivatedRoute,ParamMap} from '@angular/router';
import { RecruiterService } from 'src/app/services/recruiter.service';
//import{ForrecruiterService} from '../../../forrecruiter.service';
@Component({
  selector: 'app-postedjobs',
  templateUrl: './postedjobs.component.html',
  styleUrls: ['./postedjobs.component.css']
})
export class PostedjobsComponent implements OnInit {
  headers=['Job Role','Experience','Job Type','PostedDate',''];
  posted:any;
  nojobs:any;
  totaljobs:any;
  errormsg:any;
  successmsg:boolean=true;
  constructor(private router:Router,private activeroute:ActivatedRoute, private recruiterService:RecruiterService) { }

  ngOnInit() {
    this.postedjobs();
  }
  postedjobs()
  {
    this.recruiterService.getpostedjobs().subscribe(
      (response:any)=>{
        if(response&& response.length>0){
        this.successmsg=true;
       
        this.posted=response;
        this.totaljobs=response.length;
        this.successmsg=true;
        }
        
      else{
        console.log(response);
        this.nojobs=response.message;
        console.log(response.length);
        
        //console.log(this.applied);
      }
    },(error:any)=>{
      this.errormsg=error;
    }
    )
  }
}
