
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, tap } from 'rxjs';

import { Employee} from '../../../model/employee.model';
import { EmployeeBase } from '../../../model/employee-base.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly employeesUrl = "http://localhost:3000/employees"

  constructor(
    private readonly httpClient: HttpClient,
  ) { }

  public getEmployeeList(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.employeesUrl)
  }

  public addEmployee(employee: EmployeeBase): Observable<Employee> {
    return this.httpClient.post<Employee>(this.employeesUrl, employee)
  }

  public updateEmployee(id: string, employee: EmployeeBase): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;
    return this.httpClient.patch<Employee>(url, employee)
  }

  public deleteEmployee(id: string): Observable<Employee> {
    return this.httpClient.delete<Employee>(`${this.employeesUrl}/${id}`)
  }

  public updateCvId (employeeId: string, cvsId: string[] | undefined): Observable<Employee> {
    const url = `${this.employeesUrl}/${employeeId}`;
    return this.httpClient.patch<Employee>(url, {cvsId})
  }

}
