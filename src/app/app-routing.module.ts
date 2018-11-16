import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NameComponent } from './name/name.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HameDeitalComponent } from './hame-deital/hame-deital.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: 'dashboad', component: DashboardComponent},
  {path: 'detail/:id', component: HameDeitalComponent},
  {path: 'ListName', component: NameComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
