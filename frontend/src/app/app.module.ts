import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { IssuesService } from './services/issues.service';
import { AppRouters } from './app.routes';
import { HomeComponent } from './home/home.component';
import { ViewIssueComponent } from './view-issue/view-issue.component';
import { CallbackComponent } from './callback/callback.component';
import { AuthGuard } from './services/auth.guard'
import { AuthService } from './services/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    HomeComponent,
    ViewIssueComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    AppRouters,
    FormsModule
  ],
  providers: [AuthService, IssuesService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
