
import { NgModule, Type } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesModule } from './modules/employees/employees.module';
import { ProjectsModule } from './modules/projects/projects.module';


const rootRoutes: Routes = [

  {
    path: '',
    loadChildren: (): Promise<Type<EmployeesModule>> =>
      import('./modules/employees/employees.module').then(module => module.EmployeesModule),
    data: { breadcrumb: 'Employee' }
  },
  {
    path: 'projects',
    loadChildren: (): Promise<Type<ProjectsModule>> =>
      import('./modules/projects/projects.module').then(module => module.ProjectsModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(rootRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
