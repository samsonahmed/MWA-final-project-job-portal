import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const url = 'http://localhost:3000/'
@Injectable()
export class RecruiterService {

  constructor(private httpclient: HttpClient) { }
  recruiterRegister(body: any) {
    return this.httpclient.post(`${url}recruiters`,body)
  }
  getpostedjobs(){
    return this.httpclient.get(`${url}recruiters/postedJobs/addis`)
  }
  getseekers(){
    return this.httpclient.get(`${url}recruiters/appliedEmployee/keforce`)
  }
  postjob(body: any){
    return this.httpclient.post(`${url}recruiters/addJobs/addis`,body)
  }
}
