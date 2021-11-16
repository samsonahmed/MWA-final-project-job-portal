import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';

const url = 'http://localhost:3000/';
@Injectable()
export class EmployeeService {

  constructor(private httpclient: HttpClient) { }

  employeeRegister(body: any) {
    return this.httpclient.post(`${url}seekers`,body)
  }
 getJobs(){
  const httpOptions = {
    headers: new HttpHeaders({
      //'Accept': 'application/json, text/plain, */*',
       'Content-Type':'application/json',
      //'Authorization': 'Bearer '+this.gettoken()
    })
  };
  return this.httpclient.get(`${url}seekers/getjobs`,httpOptions);
 } 
 getAppliedJobs(){
  const httpOptions = {
    headers: new HttpHeaders({
      //'Accept': 'application/json, text/plain, */*',
       'Content-Type':'application/json',
      //'Authorization': 'Bearer '+this.gettoken()
    })
  };
  return this.httpclient.get(`${url}seekers/appliedJobs/Bekele`,httpOptions);
 }
 getprofile()
{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      // 'Authorization': `Bearer${this.gettoken()}`
    })
  };
  return this.httpclient.get(`${url}seekers/samson`,httpOptions);
}
 empupdateprofile(body:any)
{
  return this.httpclient.put(`${url}seekers/samson`,body,
  {
    
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    
  });
}
}
