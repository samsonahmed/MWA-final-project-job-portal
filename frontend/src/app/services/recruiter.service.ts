import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const url = 'http://localhost:3000/'
@Injectable()
export class RecruiterService {

  constructor(private httpclient: HttpClient) { }
  login(body: any) {
    return this.httpclient.post(`${url}recruiters/login`, body, {
      observe: 'body',
      // withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
    });
  }
  recruiterRegister(body: any) {
    return this.httpclient.post(`${url}recruiters`,body)
  }
  getpostedjobs(){
    return this.httpclient.get(`${url}recruiters/postedJobs/${this.getpayload()}`)
  }
  getseekers(){
    return this.httpclient.get(`${url}recruiters/appliedEmployee/${this.getpayload()}`)
  }
  send(info:any){
    let email=info;
    console.log(email);
    return this.httpclient.get(`${url}recruiters/send/${email}`);
  }
  postjob(body: any){
    return this.httpclient.post(`${url}recruiters/addJobs/${this.getpayload()}`,body)
  }
  gettoken() {
    return localStorage.getItem('recruitertoken');
  }
  getpayload() {
    return localStorage.getItem('name');
  }
  logout()
{
  localStorage.removeItem('recruitertoken');
  localStorage.removeItem('name');
}
}
