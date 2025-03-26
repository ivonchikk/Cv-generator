import { createReducer, on } from '@ngrx/store';

import { EmployeeState } from './employees.state';
import { deleteEmployeeSuccess, loadEmployeesSuccess, updateEmployeeCvIdsSuccess, updateEmployeeSuccess } from './employees.actions';


export const initialState: EmployeeState = {
    employees: []
}

export const employeesReducer = createReducer(
    initialState,
    on(loadEmployeesSuccess, (state, { employees }) => ({ employees })),
    on(updateEmployeeSuccess, (state, { employeeDate }) => ({ employees: state.employees.map(employee => employee.id === employeeDate.id ? employee = employeeDate : employee) })),
    on(deleteEmployeeSuccess, (state, { id }) => ({ ...state, employees: state.employees.filter((emp) => emp.id !== id) })),
    on(updateEmployeeCvIdsSuccess, (state, { updateEmployee }) => ({
        ...state, employees: state.employees.map(employee => employee.id === updateEmployee.id ? updateEmployee : employee)}))
)