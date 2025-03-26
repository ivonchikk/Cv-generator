import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { getEmployeeById } from '../../../../ngrx/employees/employees.selectors';
import { addEmployee, updateEmployeeInfo } from '../../../../ngrx/employees/employees.actions';


import { Employee } from '../../../../model/employee.model';
import { MessageService } from '../../services/message.service';
import { Location } from '@angular/common';
import { EmployeeState } from '../../../../ngrx/employees/employees.state';
import { ProfileInfo } from '../../../../model/forms/profile-info.interface';
import { ButtonTypes } from '../../../../shared/ui/button/cv-gen-button/button-types.enum';

@Component({
  selector: 'app-emp-info',
  templateUrl: './emp-info.component.html',
  styleUrl: './emp-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EmpInfoComponent implements OnInit {

  public readonly specializationOptions: string[] = ["Angular", "React", "Vue"]
  public readonly departmentOptions: string[] = ["JavaScript", "Python", "C++"]
  public readonly buttonTypes = ButtonTypes

  public employee?: Employee;
  public employeeId!: string;

  public readonly profileInfo:FormGroup<ProfileInfo> = new FormGroup({
    firstName: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
    lastName: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
    email: new FormControl<string>('', { validators: [Validators.required, Validators.email], nonNullable: true }),
    specialization: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),
    department: new FormControl<string>('', { validators: [Validators.required], nonNullable: true }),

  })


  constructor(
    private readonly store: Store<EmployeeState>,
    private readonly route: ActivatedRoute,
    private readonly messageService: MessageService,
    private readonly location: Location,
    private readonly router: Router,
  ) { }

  public ngOnInit(): void {
    this.employeeId = this.route.parent?.snapshot.paramMap.get('id')!;
    this.getEmployee()
    this.patchEmployee()
  }

  private getEmployee(): void {
    this.store.select(getEmployeeById(this.employeeId)).subscribe(employee => this.employee = employee)
  }

  private patchEmployee(): void {
    this.profileInfo.patchValue({
      ...this.employee
    })
  }

  public saveBtnEvent(): void {
    if (this.profileInfo.invalid) {
      this.messageService.showWarningMessage('Please, specify the required fields!')
    } else { this.employeeId === 'create' ? this.addEmployee() : this.saveEmployee() }
  }

  public addEmployee(): void {
    this.store.dispatch(addEmployee({ employee: this.profileInfo.getRawValue() }))
    this.router.navigate(["employees"])
  }

  public saveEmployee(): void {
    this.store.dispatch(updateEmployeeInfo({ id: this.employeeId, employee: this.profileInfo.getRawValue() }))
  }


  public canselBtnEvent(): void {
    this.employeeId === 'create' ? this.goBack() : this.patchEmployee()
  }
  private goBack(): void {
    this.location.back()
  }
  
}