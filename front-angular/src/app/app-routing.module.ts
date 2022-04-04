import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './dashboard/components/not-found/not-found.component';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { GeneralRoutingModule } from './general/general-routing.module';
import { GeneralModule } from './general/general.module';
import { LoginRoutingModule } from './login/login-routing.module';

const routes: Routes = [
  // { path: '**', redirectTo: '', pathMatch: 'full' }
  {
    path: '**', component: NotFoundComponent, children: [{
      path: 'not-found', redirectTo: '/not-found', pathMatch: 'full'
    }]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    LoginRoutingModule,
    GeneralRoutingModule,
    DashboardRoutingModule,

    GeneralModule,
    DashboardModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
