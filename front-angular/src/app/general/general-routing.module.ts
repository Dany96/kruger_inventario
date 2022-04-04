import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './shared/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [{
      path: 'dashboard', redirectTo: '/dashboard', pathMatch: 'full'
    }]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralRoutingModule { }
