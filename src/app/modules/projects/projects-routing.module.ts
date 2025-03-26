import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectInfoComponent } from './project-info/project-info.component';

const projectRoutes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
    children: [
      {
        path: '',
        component: ProjectsListComponent,
      },
      {
        path: ':id',
        component: ProjectInfoComponent,
      }
    ]
  },

];



@NgModule({
  imports: [RouterModule.forChild(projectRoutes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
