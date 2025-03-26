import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectForm } from '../../../model/forms/project-form.interface';
import { Observable, tap } from 'rxjs';
import { Project } from '../../../model/project.model';
import { Store } from '@ngrx/store';
import { getProjectsById } from '../../../ngrx/projects/projects.selector';
import { ActivatedRoute } from '@angular/router';
import { ButtonTypes } from '../../../shared/ui/button/cv-gen-button/button-types.enum';
import { ProjectBase } from '../../../model/project-base.model';
import { updateProject } from '../../../ngrx/projects/projects.actions';
import { SPECIALIZATION_OPTIONS } from '../../../shared/constants/specialization-options';
import { DEPARTMENT_OPTIONS } from '../../../shared/constants/departmentOptions';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrl: './project-info.component.scss'
})
export class ProjectInfoComponent implements OnInit {

  public readonly projectForm: FormGroup<ProjectForm> = new FormGroup({
    projectName: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
    startDate: new FormControl<Date>(new Date(), { validators: [Validators.required], nonNullable: true }),
    endDate: new FormControl<Date>(new Date(), { validators: [Validators.required], nonNullable: true }),
    teamSize: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
    techStack: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
    roles: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
    description: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
    responsibilities: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
  })
  public readonly specializationOptions: string[] = SPECIALIZATION_OPTIONS
  public readonly departmentOptions: string[] = DEPARTMENT_OPTIONS
  public readonly buttonTypes = ButtonTypes

  public currentProject$!: Observable<Project | undefined>
  public project!: Project | undefined
  public readonly projectId: string = this.route.snapshot.paramMap.get('id')!;


  constructor(
    public readonly store: Store,
    private readonly route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.currentProject$ = this.store.select(getProjectsById(this.projectId))
    this.currentProject$.subscribe(project => this.project = project)
    this.patchProject(this.project)
  }

  private patchProject(project: Project | undefined) {
    this.projectForm.patchValue({
      ...project,
      startDate: new Date(Number(project?.startDate)),
      endDate: new Date(Number(project?.endDate))
    })
  }

  public saveProject() {
    this.store.dispatch(updateProject({ id: this.projectId, project: this.getProjectDataByForm()}))
  }

  public cancelProject() {
    this.patchProject(this.project)
  }


    private getProjectDataByForm(): ProjectBase {
      const projectFormData = this.projectForm.getRawValue()
      const projectData: ProjectBase = ({
        ...projectFormData,
        startDate: projectFormData.startDate.getTime(),
        endDate: projectFormData.endDate.getTime()
      })
      return projectData
    }
}
