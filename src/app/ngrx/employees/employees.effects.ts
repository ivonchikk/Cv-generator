import { Injectable } from "@angular/core";

import { MessageService } from './../../modules/employees/services/message.service';
import { EmployeeService } from './../../modules/employees/services/employee.service';

import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from 'rxjs';

import {
    addEmployee,
    addEmployeeFailure,
    addEmployeeSuccess,
    deleteEmployee,
    deleteEmployeeFailure,
    deleteEmployeeSuccess,
    initEmployees,
    loadEmployeesFailure,
    loadEmployeesSuccess,
    updateEmployeeCvIds,
    updateEmployeeCvIdsFailure,
    updateEmployeeCvIdsSuccess,
    updateEmployeeFailure,
    updateEmployeeInfo,
    updateEmployeeSuccess
} from './employees.actions';
import { Employee } from "../../model/employee.model";

@Injectable({ providedIn: 'root' })

export class EmployeesEffects {

    constructor(
        private employeeService: EmployeeService,
        private messageService: MessageService,
        private actions$: Actions,                     
    ) { }
   

    initEmployees$ = createEffect(() =>
        this.actions$.pipe(
            ofType(initEmployees),
            switchMap(() =>
                this.employeeService.getEmployeeList().pipe(
                    map((employees) => {
                        return loadEmployeesSuccess({ employees: employees })
                    }),
                    catchError((error) => {
                        return of(loadEmployeesFailure({ error }))
                    })

                )
            )
        )
    )


    updateEmployeeInfo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateEmployeeInfo),
            switchMap((action) =>
                this.employeeService.updateEmployee(action.id, action.employee).pipe(
                    map((employeeDate) => {
                        this.messageService.showSuccessMessage("Employee saved successfully")
                        return updateEmployeeSuccess({employeeDate})
                    }),
                    catchError((error) => {
                        this.messageService.showErrorMessage('Error with update ');
                        return of(updateEmployeeFailure({ error }))

                    })
                )
            )
        )
    )

    addEmployee$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addEmployee),
            switchMap((action) =>
                this.employeeService.addEmployee(action.employee).pipe(
                    map(() => {
                        this.messageService.showSuccessMessage("Employee added successfully ")
                        return addEmployeeSuccess()
                    }),
                    catchError((error) => {
                        this.messageService.showErrorMessage('Error with adding ')
                        return of(addEmployeeFailure({ error }))
                    })
                )
            )
        )
    )

    deleteEmployee$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteEmployee),
            switchMap((action) =>
                this.employeeService.deleteEmployee(action.id).pipe(
                    map((employee: Employee) => {
                        this.messageService.showSuccessMessage('Employee successfully removed')
                        return deleteEmployeeSuccess({id: employee.id})
                    }),
                    catchError((error) => {
                        this.messageService.showErrorMessage('Error with deletion ')
                        return of(deleteEmployeeFailure({ error }))
                    })
                )
            )
        )
    )

    updateEmployeeCvIds$ =  createEffect(() =>
        this.actions$.pipe(
            ofType(updateEmployeeCvIds),
            switchMap((action) =>
                this.employeeService.updateCvId(action.employeeId, action.updateCvIds).pipe(
                    map((employee: Employee) => {
                        return updateEmployeeCvIdsSuccess({updateEmployee: employee})
                    }),
                    catchError((error) => {
                        this.messageService.showErrorMessage('Error with update cvIds ')
                        return of(updateEmployeeCvIdsFailure({error}))
                    })
                )
            )
        )
    )
}
