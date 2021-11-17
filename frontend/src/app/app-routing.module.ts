import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { EmployloginComponent } from './components/login/employlogin/employlogin.component';
import { RecruiterloginComponent } from './components/login/recruiterlogin/recruiterlogin.component';
import { DashboardComponent } from './components/employeedashboard/dashboard.component';
import { JobsComponent } from './components/employeedashboard/jobs/jobs.component';
import { AppliedjobsComponent } from './components/employeedashboard/appliedjobs/appliedjobs.component';
import { RegisterComponent } from './components/register/register.component';
import { EmployregisterComponent } from './components/register/employregister/employregister.component';
import { RecruiterregisterComponent } from './components/register/recruiterregister/recruiterregister.component';
import { EditprofileComponent } from './components/employeedashboard/editprofile/editprofile.component';
import { EmployeeprofileComponent } from './components/employeedashboard/employeeprofile/employeeprofile.component';
import { SearchComponent } from './components/employeedashboard/search/search.component';
import { AppliedEmployeesComponent } from './components/recruiterdashboard/applied-employees/applied-employees.component';
import { PostjobComponent } from './components/recruiterdashboard/postjob/postjob.component';
import { RecruiterprofileComponent } from './components/recruiterdashboard/recruiterprofile/recruiterprofile.component';
import { PostedjobsComponent } from './components/recruiterdashboard/postedjobs/postedjobs.component';
import { RecruiterdashboardComponent } from './components/recruiterdashboard/recruiterdashboard.component';
import { AuthorizationGuard } from './authorization.guard';
import { RecruiterGuard } from './recruiter.guard';
const routes: Routes = [
  { path: '', redirectTo: 'login/emp_login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    children: [
      { path: 'emp_login', component: EmployloginComponent },
      { path: 'rec_login', component: RecruiterloginComponent },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthorizationGuard],
    children: [
      {
        path: 'jobs',
        component: JobsComponent,
        canActivate: [AuthorizationGuard],
      },
      {
        path: 'appliedjobs',
        component: AppliedjobsComponent,
        canActivate: [AuthorizationGuard],
      },
    ],
  },
  {
    path: 'register',
    component: RegisterComponent,
    children: [
      { path: 'emp_register', component: EmployregisterComponent },
      { path: 'rec_register', component: RecruiterregisterComponent },
    ],
  },
  {
    path: 'seeker/eprofile',
    component: EmployeeprofileComponent,
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'seeker/editprofile',
    component: EditprofileComponent,
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'seeker/search',
    component: SearchComponent,
    canActivate: [AuthorizationGuard],
  },
  {
    path: 'rdashboard',
    component: RecruiterdashboardComponent,
    canActivate: [RecruiterGuard],
    children: [
      {
        path: 'postedjobs',
        component: PostedjobsComponent,
        canActivate: [RecruiterGuard],
      },
      {
        path: 'applied',
        component: AppliedEmployeesComponent,
        canActivate: [RecruiterGuard],
      },
    ],
  },
  {
    path: 'recruiter/postjob',
    component: PostjobComponent,
    canActivate: [RecruiterGuard],
  },
  {
    path: 'recruiter/rprofile',
    component: RecruiterprofileComponent,
    canActivate: [RecruiterGuard],
  },
  { path: '**', redirectTo: 'login/emp_login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
  EmployloginComponent,
  RecruiterloginComponent,
  DashboardComponent,
  JobsComponent,
  AppliedjobsComponent,
  RegisterComponent,
  EmployregisterComponent,
  RecruiterregisterComponent,
  EditprofileComponent,
  EmployeeprofileComponent,
  SearchComponent,
  AppliedEmployeesComponent,
  PostjobComponent,
  RecruiterprofileComponent,
  PostedjobsComponent,
  RecruiterdashboardComponent,
];
