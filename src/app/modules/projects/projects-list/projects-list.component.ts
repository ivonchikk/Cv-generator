import { Component } from '@angular/core';
import { Column } from '../../../shared/ui/table/cv-table/column.interface ';
import { map, Observable } from 'rxjs';
import { Project } from '../../../model/project.model';
import { Store } from '@ngrx/store';
import { selectAllProjects } from '../../../ngrx/projects/projects.selector';
import { initProjects } from '../../../ngrx/projects/projects.actions';


const COLUMNS: Column[] = [
  { columnDef: 'projectName', header: 'Project Name' },
  { columnDef: 'teamSize', header: 'Team size' },
  { columnDef: 'techStack', header: 'Teach stack' },
  { columnDef: 'startDate', header: 'Start Date' },
  { columnDef: 'endDate', header: 'End Date' },
]

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.scss'
})
export class ProjectsListComponent {

  public readonly tableColumns: Column[] = COLUMNS;
  public readonly projectsList$: Observable<Project[]> = this.store.select(selectAllProjects)

  constructor(private readonly store: Store) { this.store.dispatch(initProjects()) }
}
