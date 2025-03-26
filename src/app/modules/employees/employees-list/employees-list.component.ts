import { Employee } from './../../../model/employee.model';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Column } from '../../../shared/ui/table/cv-table/column.interface ';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { deleteEmployee, initEmployees } from './../../../ngrx/employees/employees.actions';
import { selectAllEmployees } from './../../../ngrx/employees/employees.selectors';
import { EmployeeState } from '../../../ngrx/employees/employees.state';
import { MessageService } from '../services/message.service';
import { ButtonTypes } from '../../../shared/ui/button/cv-gen-button/button-types.enum';
import { deleteCv } from '../../../ngrx/cvs/cvs.actions';

const COLUMNS: Column[] = [
  { columnDef: 'firstName', header: 'First Name' },
  { columnDef: 'lastName', header: 'Last Name' },
  { columnDef: 'email', header: 'Email' },
  { columnDef: 'department', header: 'Department' },
  { columnDef: 'specialization', header: 'Specialization' },
  { columnDef: 'action', header: 'Action' },

]

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesListComponent {
  
  public readonly employeeList$: Observable<Employee[]> = this.store.select(selectAllEmployees)
  
  public readonly tableColumns: Column[] = COLUMNS;
  public readonly buttonTypes = ButtonTypes
  
  constructor(
    private readonly router: Router,
    private readonly store: Store<EmployeeState>,
    private readonly messageService: MessageService,

  ) {  this.store.dispatch(initEmployees())  }

  public navigateToAddEmployee(): void {
    this.router.navigate(["employees/create"])
  }

  public deleteEmploee(employee: Employee): void {
    if (this.messageService.showQuestion('Delete the employee?')) {
      this.store.dispatch(deleteEmployee({ id: employee.id }))
      employee.cvsId?.forEach(cvId => this.store.dispatch(deleteCv({id: cvId})))
    }
  }
}



