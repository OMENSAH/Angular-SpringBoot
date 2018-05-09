import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { IssuesService } from './services/issues.service';
import { AppRouters } from './app.routes';


@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    AppRouters
  ],
  providers: [IssuesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
