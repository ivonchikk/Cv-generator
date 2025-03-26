import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Employee } from "../../model/employee.model";
import { EmployeeState } from "./employees.state";



export const selectEmployees = createFeatureSelector<EmployeeState>('employees')
  
  export const selectAllEmployees = createSelector(
    selectEmployees,
    (state:EmployeeState) => state.employees
  );

  export const getEmployeeById = (id: string) => createSelector(
    selectAllEmployees,
    (employees: Employee[]) => employees.find((employee) => employee.id === id)
  )

  export const getCvIdsByEmployeeId = (employeeId: string) => createSelector(
    selectAllEmployees,
    (employees: Employee[]) => employees.find((employee) => employee.id === employeeId)?.cvsId
  )


  






// export const selectEmployeesState = createFeatureSelector<Employee[]>("employees")

// export const selectAllEmployees = createSelector(
//     selectEmployeesState,
//     (state: Employee[]) => state.employees
// )