import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './home/home.component';
import { ViewIssueComponent } from './view-issue/view-issue.component'; 
import { CallbackComponent } from './callback/callback.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: "callback",component: CallbackComponent},
  {path:  'admin/view/:id', component: ViewIssueComponent, canActivate:[AuthGuard]},
  {path: 'admin', component: AdminDashboardComponent, canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRouters {}