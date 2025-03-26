import { updateCvFailure } from './../../../../ngrx/cvs/cvs.actions';
import { filter, take } from 'rxjs/operators';

import { ChangeDetectionStrategy, Component, OnInit, OnChanges, afterNextRender } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { tap, Observable, map, switchMap, of, Subscription, Subject, BehaviorSubject } from 'rxjs';

import { getCvIdsByEmployeeId, getEmployeeById } from '../../../../ngrx/employees/employees.selectors';
import { addCv, deleteCv, initCvs, updateCv, updateCvProjectsIds } from '../../../../ngrx/cvs/cvs.actions';
import { getCvsById } from '../../../../ngrx/cvs/cvs.selector';
import { addProject, deleteProject, initProjects, updateProject } from '../../../../ngrx/projects/projects.actions';

import { Employee } from '../../../../model/employee.model';
import { ProfileCv } from '../../../../model/forms/profile-cv.interface';
import { ProjectForm } from '../../../../model/forms/project-form.interface';
import { ButtonTypes } from '../../../../shared/ui/button/cv-gen-button/button-types.enum';
import { CV } from '../../../../model/cv.model';
import { Project } from '../../../../model/project.model';
import { getProjectsById } from '../../../../ngrx/projects/projects.selector';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MessageService } from '../../services/message.service';
import { ProjectBase } from '../../../../model/project-base.model';
import { updateEmployeeCvIds } from '../../../../ngrx/employees/employees.actions';
import { SPECIALIZATION_OPTIONS } from '../../../../shared/constants/specialization-options';
import { DEPARTMENT_OPTIONS } from '../../../../shared/constants/departmentOptions';

@Component({
  selector: 'app-emp-cv',
  templateUrl: './emp-cv.component.html',
  styleUrl: './emp-cv.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmpCvComponent implements OnInit {

  public readonly profileCv: FormGroup<ProfileCv> = new FormGroup({
    lastName: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
    email: new FormControl<string>('', { validators: [Validators.required, Validators.email], nonNullable: true }),
    skills: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
    specialization: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
    department: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
  })

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

  public employeeData: Employee | undefined
  public employeeId: string = this.route.parent?.snapshot.paramMap.get('id')!;
  public readonly employee$: Observable<Employee | undefined> = this.store.select(getEmployeeById(this.employeeId))

  public readonly cvIdsByEmployee$: Observable<string[] | undefined> = this.store.select(getCvIdsByEmployeeId(this.employeeId));
  public selectedCvId: string = ''

  public projectsIdsByCv$!: Observable<string[] | undefined>;
  public selectedProjectId!: string;
  public projectsIdsInCv!: string[];


  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly messageService: MessageService,
  ) { }


  public ngOnInit(): void {
    this.store.dispatch(initCvs());
    this.store.dispatch(initProjects());
  }

  public selectCv(cvId: string): void {
    this.selectedCvId = cvId
    this.selectedProjectId = ''

    this.store.select(getCvsById(cvId))
      .pipe(take(1))
      .subscribe(cv => {
        if (cv) {
          this.patchCv(cv)
        }
      })

    this.projectsIdsByCv$ = this.store.select(getCvsById(cvId)).pipe(map(cv => cv?.projectsIds))
  }

  private patchCv(currentCv: CV): void {
    this.profileCv.patchValue({ ...currentCv })
  }


  public selectProject(projectId: string) {
    this.selectedProjectId = projectId

    this.store.select(getProjectsById(projectId))
      .pipe(take(1))
      .subscribe(project => {
        if (project) {
          this.patchProject(project);
        }
      })
  }

  private patchProject(currentProject: Project): void {
    this.projectForm.patchValue({
      ...currentProject,
      startDate: new Date(Number(currentProject?.startDate)),
      endDate: new Date(Number(currentProject?.endDate))
    })
  }



  public saveCv(): void {
    if (this.profileCv.invalid || (this.selectedProjectId && this.projectForm.invalid)) {
      this.messageService.showWarningMessage('Please, specify the required fields!')
    } else {
      if (this.profileCv.dirty) {
        this.store.dispatch(updateCv({ id: this.selectedCvId, cv: this.profileCv.getRawValue() }))
      }
      if (this.selectedProjectId && this.projectForm.dirty) {
        this.store.dispatch(updateProject({ id: this.selectedProjectId, project: this.getProjectDataByForm() }))
      }
    }
  }

  public addCv(): void {
    const newCv: CV = {
      id: String(Date.now()),
      email: '',
      lastName: '',
      department: '',
      specialization: '',
      skills: '',
    }

    this.cvIdsByEmployee$
      .pipe(
        take(1),
        map((ids: string[] | undefined) => ids ? ([...ids, newCv.id]) : [newCv.id])
      )
      .subscribe((updateIds: string[]) => {
        this.store.dispatch(addCv({ cv: newCv }))
        this.store.dispatch(updateEmployeeCvIds({ employeeId: this.employeeId, updateCvIds: updateIds }))
      })


  }

  public deleteCv(event: MouseEvent, cvId: string): void {
    event.stopPropagation()
    this.cvIdsByEmployee$
      .pipe(
        take(1),
        map((ids: string[] | undefined) => ids ? ids.filter(id => id !== cvId) : [])
      )
      .subscribe((updateIds: string[]) => {
        this.store.dispatch(deleteCv({ id: cvId }))
        this.store.dispatch(updateEmployeeCvIds({ employeeId: this.employeeId, updateCvIds: updateIds }))
      })

    this.selectedCvId = ''
  }


  public addProject(): void {
    const newProject: Project = {
      id: String(Date.now()),
      projectName: '',
      startDate: 0,
      endDate: 0,
      teamSize: '',
      techStack: '',
      roles: '',
      description: '',
      responsibilities: ''
    }

    this.projectsIdsByCv$
      .pipe(
        take(1),
        map((ids: string[] | undefined) => ids ? ([...ids, newProject.id]) : [newProject.id]),
      )
      .subscribe(updateIds => {
        this.store.dispatch(addProject({ project: newProject }))
        this.store.dispatch(updateCvProjectsIds({ cvId: this.selectedCvId, updateProjectsIds: updateIds }))
      })
  }

  public deleteProject(projectId: string) {
    this.projectsIdsByCv$
      .pipe(
        take(1),
        map((ids: string[] | undefined) => ids ? ids.filter(id => id !== projectId) : [])
      )
      .subscribe(updateIds => {
        this.store.dispatch(deleteProject({ id: projectId }))
        this.store.dispatch(updateCvProjectsIds({ cvId: this.selectedCvId, updateProjectsIds: updateIds }))
      })
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
  public trackByFn(index: number, item: string): string {
    return item;
  }
}
