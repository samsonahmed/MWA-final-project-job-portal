import { Component, OnInit } from '@angular/core';
import{Router,ActivatedRoute,ParamMap} from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
// import{ForseekerService} from '../../../forseeker.service';
@Component({
  selector: 'app-appliedjobs',
  templateUrl: './appliedjobs.component.html',
  styleUrls: ['./appliedjobs.component.css']
})
export class AppliedjobsComponent implements OnInit {
headers=['Company Name','Job Role','Job Type','Experience',''];
applied:any =[];
nojobs:any;
errormsg:any;
successmsg:boolean=false;
constructor(private router:Router,private activeroute:ActivatedRoute,private employeeService:EmployeeService) { 

}
  ngOnInit() {
    this.appliedjobs();
  }
  appliedjobs()
  {
    this.employeeService.getAppliedJobs().subscribe(
      (response:any)=>{
        if(response.success===1){
          console.log(response)
          this.applied=response.docs;
          console.log("this is applied "+this.applied)
          this.successmsg=true;
        }
       
      else{
        this.nojobs="No Jobs Applied";
        //console.log(this.applied);
      }
    },(error)=>{
      this.errormsg=error;
    }
    )
  }

}
