import { MessageService } from './../../modules/employees/services/message.service';

import { EmployeeService } from './../../modules/employees/services/employee.service';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { catchError, map, of, switchMap } from 'rxjs';
import { addCv, addCvFailure, addCvSuccess, deleteCv, deleteCvFailure, deleteCvSuccess, initCvs, loadCvsFailure, loadCvsSuccess, updateCv, updateCvFailure, updateCvProjectsIds, updateCvProjectsIdsFailure, updateCvProjectsIdsSuccess, updateCvSuccess } from './cvs.actions';
import { CvService } from '../../modules/employees/services/cv.service';
import { CV } from '../../model/cv.model';



@Injectable({ providedIn: 'root' })

export class CvEffects {

    constructor(
        private cvService: CvService,
        private actions$: Actions,                     
        private messageService: MessageService,
    ) { }
   

    initCv$ = createEffect(() =>
        this.actions$.pipe(
            ofType(initCvs),
            switchMap(() =>
                this.cvService.getCvs().pipe(
                    map((cvs) => {
                        return loadCvsSuccess({ cvs: cvs})
                    }),
                    catchError((error) => {
                        return of(loadCvsFailure({ error }))
                    })

                )
            )
        )
    )

    updateCv$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateCv),
            switchMap((action) =>
                this.cvService.updateCv(action.id, action.cv).pipe(
                    map((cvData) => {
                        this.messageService.showSuccessMessage("CV saved successfully")
                        return updateCvSuccess({cvData})
                    }),
                    catchError((error) => {
                        this.messageService.showErrorMessage('Error with update ');
                        return of(updateCvFailure({ error }))

                    })
                )
            )
        )
    )

        addCv$ = createEffect(() =>
            this.actions$.pipe(
                ofType(addCv),
                switchMap((action) =>
                    this.cvService.addCv(action.cv).pipe(
                        map((newCv: CV) => {
                            this.messageService.showSuccessMessage("CV added successfully ")
                            return addCvSuccess({newCv: newCv})
                        }),
                        catchError((error) => {
                            this.messageService.showErrorMessage('Error with adding ')
                            return of(addCvFailure({ error }))
                        })
                    )
                )
            )
        )
        
            deleteCv$ = createEffect(() =>
                this.actions$.pipe(
                    ofType(deleteCv),
                    switchMap((action) =>
                        this.cvService.deleteCv(action.id).pipe(
                            map(() => {
                                this.messageService.showSuccessMessage('CV successfully removed')
                                return deleteCvSuccess()
                            }),
                            catchError((error) => {
                                this.messageService.showErrorMessage('Error with deletion ')
                                return of(deleteCvFailure({ error }))
                            })
                        )
                    )
                )
            )

            updateCvProjectsIds$ =  createEffect(() =>
                this.actions$.pipe(
                    ofType(updateCvProjectsIds),
                    switchMap((action) =>
                        this.cvService.updateProjectId(action.cvId, action.updateProjectsIds).pipe(
                            map((cv: CV) => {
                                return updateCvProjectsIdsSuccess({updateCv: cv})
                            }),
                            catchError((error) => {
                                this.messageService.showErrorMessage('Error with update projectId in CV ')
                                return of(updateCvProjectsIdsFailure({error}))
                            })
                        )
                    )
                )
            )
}