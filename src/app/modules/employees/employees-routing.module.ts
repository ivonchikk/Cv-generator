import { EmpCvComponent } from './profile/emp-cv/emp-cv.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeesComponent } from './employees.component';
import { ProfileComponent } from './profile/profile.component';
import { EmpInfoComponent } from './profile/emp-info/emp-info.component';

const employeesRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'employees',
  },
  {
    path: 'employees',
    component: EmployeesComponent,
    data: { breadcrumb: 'Employees' },
    children: [
      {
        path: '',
        component: EmployeesListComponent,
        data: { breadcrumb: 'EmployeesList' },
      },
      {
        path: ':id',
        component: ProfileComponent,
        data: { breadcrumb: 'ProfileId' },
        children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
          { path: 'info', component: EmpInfoComponent, data: { breadcrumb: 'Info' } },
          { path: 'cv', data: { breadcrumb: 'CV' }, component: EmpCvComponent },
          { path: 'create', data: { breadcrumb: 'Create' }, component: EmpInfoComponent },
        ]
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(employeesRoutes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
