import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const url = 'http://localhost:3000/';
@Injectable()
export class EmployeeService {
  constructor(private httpclient: HttpClient) {}

  login(body: any) {
    return this.httpclient.post(`${url}seekers/login`, body, {
      observe: 'body',
      // withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
    });
  }

  employeeRegister(body: any) {
    return this.httpclient.post(`${url}seekers`, body,{
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
  getJobs() {
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.gettoken()
      }),
    };
    return this.httpclient.get(`${url}seekers/getjobs`, httpOptions);
  }
  applyjob(info:any)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': 'Bearer'+' '+this.gettoken()
      })
    };
    let companyName=info.companyName;
    let job_id:any=info._id;
    let emp_id:any=this.getpayload();
    return this.httpclient.post(`${url}seekers/applyjobs/${emp_id}/${companyName}/${job_id}`,httpOptions);
  }
  getAppliedJobs() {
    const httpOptions = {
      headers: new HttpHeaders({
        //'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.gettoken()
      }),
    };
    return this.httpclient.get(`${url}seekers/appliedJobs/${this.getpayload()}`, httpOptions);
  }
  getprofile() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.gettoken()
      }),
    };
    return this.httpclient.get(`${url}seekers/${this.getpayload()}`, httpOptions);
  }
  empupdateprofile(body: any) {
    return this.httpclient.put(`${url}seekers/${this.getpayload()}`, body, {
      // observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
    });
  }
  gettoken() {
    return localStorage.getItem('employeetoken');
  }
  getpayload() {
    console.log(localStorage.getItem('name'));
    return localStorage.getItem('name');
  }
  logout()
{
  localStorage.removeItem('employeetoken');
  localStorage.removeItem('name');
}
}
