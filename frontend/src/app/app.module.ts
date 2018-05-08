import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';

import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
