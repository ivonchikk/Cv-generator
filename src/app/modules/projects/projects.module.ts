import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectInfoComponent } from './project-info/project-info.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectsListComponent,
    ProjectInfoComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule,
  ],
  exports: [
    ProjectsComponent
  ]
})
export class ProjectsModule { }
