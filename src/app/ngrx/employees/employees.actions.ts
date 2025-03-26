import { createAction, props } from "@ngrx/store";
import { Employee } from "../../model/employee.model";
import { EmployeeBase } from "../../model/employee-base.model";

export const initEmployees = createAction('[Employees] Init Employees');
export const loadEmployeesSuccess = createAction('[Employees] Load Employees Success', props<{ employees: Employee[] }>());
export const loadEmployeesFailure = createAction('[Employees] Load Employees Failure', props<{ error: string }>());

export const updateEmployeeInfo = createAction('[Employees/Info] Update Employees', props<{ id: string; employee: EmployeeBase }>());
export const updateEmployeeSuccess = createAction('[Employees/Info] Update Employee Success', props<{ employeeDate: Employee }>());
export const updateEmployeeFailure = createAction('[Employees/Info] Update Employee Failure', props<{ error: string }>());

export const addEmployee = createAction('[Employees] Add Employees', props<{ employee: EmployeeBase }>());
export const addEmployeeSuccess = createAction('[Employees/Info] Add Employee Success');
export const addEmployeeFailure = createAction('[Employees/Info] Add Employee Failure', props<{ error: string }>());

export const deleteEmployee = createAction('[Employees] Delete Employee', props<{ id: string }>());
export const deleteEmployeeSuccess = createAction('[Employees] Delete Employee Success', props<{ id: string }>());
export const deleteEmployeeFailure = createAction('[Employees] Delete Employee Failure', props<{ error: string }>());

export const updateEmployeeCvIds = createAction('[Employees/Cvs]] Update CvId', props<{ employeeId: string; updateCvIds: string[] }>());
export const updateEmployeeCvIdsSuccess = createAction('[Employees/Cvs] Update CvId Success', props<{ updateEmployee: Employee }>());
export const updateEmployeeCvIdsFailure = createAction('[Employees/Cvs] Update CvId Failure', props<{ error: string }>());
