import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralRoutingModule } from './general-routing.module';
import { DialogAlertComponent } from './shared/dialog-alert/dialog-alert.component';
import { DashboardComponent } from './shared/dashboard/dashboard.component';
import { MaterialModule } from '../material-module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastrModule } from 'ngx-toastr';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { DialogSpinnerComponent } from './shared/dialog-spinner/dialog-spinner.component';
import { DialogEmployeGenerateComponent } from './shared/dialog-employe-generate/dialog-employe-generate.component';
import { DialogUserGenerateComponent } from './shared/dialog-user-generate/dialog-user-generate.component';
import { PasswordToggleDirective } from './shared/password-toggle.directive';


@NgModule({
  declarations: [
    DialogAlertComponent,
    DashboardComponent,
    DialogSpinnerComponent,
    DialogEmployeGenerateComponent,
    DialogUserGenerateComponent,
    PasswordToggleDirective
  ],
  imports: [
    CommonModule,
    GeneralRoutingModule,
    MaterialModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    MatSortModule,
    MatInputModule,
  ],
  exports:[
    DialogAlertComponent,
    DashboardComponent,
    DialogSpinnerComponent,
    DialogEmployeGenerateComponent,
    DialogUserGenerateComponent,
    DialogUserGenerateComponent
  ]
})
export class GeneralModule { }