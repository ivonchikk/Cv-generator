import { ProjectService } from './../../modules/projects/services/project.service';
import { MessageService } from '../../modules/employees/services/message.service';

import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { catchError, map, of, switchMap } from 'rxjs';
import { addProject, addProjectFailure, addProjectSuccess, deleteProject, deleteProjectFailure, deleteProjectSuccess, initProjects, loadProjectsFailure, loadProjectsSuccess, updateProject, updateProjectFailure, updateProjectSuccess } from './projects.actions';
import { Project } from '../../model/project.model';




@Injectable({ providedIn: 'root' })

export class ProjectsEffects {

    constructor(
        private projectService: ProjectService,
        private actions$: Actions,
        private messageService: MessageService,
    ) { }


    initProjects$ = createEffect(() =>
        this.actions$.pipe(
            ofType(initProjects),
            switchMap(() =>
                this.projectService.getProjects().pipe(
                    map((projects) => {
                        return loadProjectsSuccess({ projects: projects })
                    }),
                    catchError((error) => {
                        return of(loadProjectsFailure({ error }))
                    })

                )
            )
        )
    )

    updateProject$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateProject),
            switchMap((action) =>
                this.projectService.updateProjects(action.id, action.project).pipe(
                    map((projectDate) => {
                        this.messageService.showSuccessMessage("Project saved successfully")
                        return updateProjectSuccess({ projectDate })
                    }),
                    catchError((error) => {
                        this.messageService.showErrorMessage('Error with project update');
                        return of(updateProjectFailure({ error }))

                    })
                )
            )
        )
    )

    addProject$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addProject),
            switchMap((action) =>
                this.projectService.addProject(action.project).pipe(
                    map((newProject: Project) => {
                        this.messageService.showSuccessMessage("Project added successfully ")
                        return addProjectSuccess({newProject: newProject})
                    }),
                    catchError((error) => {
                        this.messageService.showErrorMessage('Error with adding ')
                        return of(addProjectFailure({ error }))
                    })
                )
            )
        )
    )

    deleteProject$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteProject),
            switchMap((action) =>
                this.projectService.deleteProject(action.id).pipe(
                    map(() => {
                        this.messageService.showSuccessMessage('Project successfully removed')
                        return deleteProjectSuccess()
                    }),
                    catchError((error) => {
                        this.messageService.showErrorMessage('Error with deletion ')
                        return of(deleteProjectFailure({ error }))
                    })
                )
            )
        )
    )
}