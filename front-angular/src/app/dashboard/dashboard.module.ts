import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from '../material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatSortModule } from '@angular/material/sort';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { GeneralModule } from '../general/general.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EmployeComponent } from './modules/employe/employe.component';
import { ProfileEmployeComponent } from './modules/profile-employe/profile-employe.component';
import { ResizableModule } from 'angular-resizable-element';


@NgModule({
  declarations: [
    NotFoundComponent,
    HomeComponent,
    EmployeComponent,
    ProfileEmployeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    BrowserModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatSortModule,
    ResizableModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule,
    MatDatepickerModule,
    GeneralModule
  ],
  exports:[
    MaterialModule,
    EmployeComponent,
    ProfileEmployeComponent
  ]
})
export class DashboardModule { }
