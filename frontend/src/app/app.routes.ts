import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './home/home.component';
import { ViewIssueComponent } from './view-issue/view-issue.component'; 
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path:  'admin/view/:id', component: ViewIssueComponent},
  {path: 'admin', component: AdminDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouters {}