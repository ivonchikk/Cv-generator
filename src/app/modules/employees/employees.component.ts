import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { initEmployees } from '../../ngrx/employees/employees.actions';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements OnInit{
  
  constructor(private store: Store){}
  
  ngOnInit(): void {
    this.store.dispatch(initEmployees())    //???
  }
}
