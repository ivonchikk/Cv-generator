import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';

import { Column } from './column.interface ';
import { Employee } from '../../../../model/employee.model';

import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { Observable } from 'rxjs';
import { Project } from '../../../../model/project.model';


@Component({
  selector: 'app-cv-table',
  templateUrl: './cv-table.component.html',
  styleUrl: './cv-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CvTableComponent implements OnInit, OnChanges {
  @Input() public tableColumns!: Column[];
  @Input() public tableData!: Observable<any> //Observable<Employee[] | Project[]>;
  @Output() public onDelete: EventEmitter<Employee> = new EventEmitter<Employee>();

  public displayedColumns: string[] = [];

  constructor(
    private readonly matIconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer,
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('tableColumns')) {
      this.displayedColumns = changes.tableColumns.currentValue.map((column: Column) => column.columnDef);
    }
  }

  public ngOnInit(): void {
    this.matIconRegistry.addSvgIcon("delete", this.domSanitizer.bypassSecurityTrustResourceUrl('delete.svg'))
  }

  public deleteBtn(event: MouseEvent, employee: Employee ): void {
    event.stopPropagation()
    this.onDelete.emit(employee)
  }

}
