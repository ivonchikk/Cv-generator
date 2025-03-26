import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';

import { SharedModule } from '../../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { EmpInfoComponent } from './profile/emp-info/emp-info.component';
import { EmpCvComponent } from './profile/emp-cv/emp-cv.component';
import { ReactiveFormsModule } from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeesListComponent,
    ProfileComponent,
    EmpInfoComponent,
    EmpCvComponent,
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,

  ],
  exports: [
    EmployeesComponent
  ],
  
})
export class EmployeesModule { }
