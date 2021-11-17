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
  console.log(this.headers);
}

  ngOnInit() {
    this.appliedjobs();
  }
  appliedjobs()
  {
    this.employeeService.getAppliedJobs().subscribe(
      (response:any)=>{
        if(response && response.length > 0){
          console.log(response)
          this.applied=response;
          this.successmsg=true;
        }
       
      else{
        this.nojobs=response.message;
        //console.log(this.applied);
      }
    },(error)=>{
      this.errormsg=error;
    }
    )
  }

}
