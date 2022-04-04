import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../general/shared/dashboard/dashboard.component';
import { AutGuardService } from '../services/aut-guard-srv.service';
import { HomeComponent } from './components/home/home.component';
import { EmployeComponent } from './modules/employe/employe.component';
import { ProfileEmployeComponent } from './modules/profile-employe/profile-employe.component';

const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent,  
    canActivate:[AutGuardService], 
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate:[AutGuardService],
        data: {
          title: 'home',
        }
      },
      {
        path: 'admin/employe',
        component: EmployeComponent,
        canActivate:[AutGuardService],
        data: {
          title: 'employe',
        }
      },
      {
        path: 'employe/profile',
        component: ProfileEmployeComponent,
        canActivate:[AutGuardService],
        data: {
          title: 'profile',
        }
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
