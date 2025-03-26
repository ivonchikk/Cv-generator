
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';

import { CvGenButtonComponent } from './ui/button/cv-gen-button/cv-gen-button.component';
import { CvTableComponent } from './ui/table/cv-table/cv-table.component';
import { CvInputComponent } from './ui/cva/cv-gen-input/cv-input.component';
import { CvGenSelectComponent } from './ui/cva/cv-gen-select/cv-gen-select.component';
import { CvGenTextareaComponent } from './ui/cva/cv-gen-textarea/cv-gen-textarea.component';
import { CvGenDatepickerComponent } from './ui/cva/cv-gen-datepicker/cv-gen-datepicker.component';


import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select'
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {CdkAccordionModule} from '@angular/cdk/accordion';

import { RouterModule } from '@angular/router';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import { CvGenProjectFormComponent } from './ui/cv-gen-project-form/cv-gen-project-form.component';
import { ProjectsAccordionComponent } from './ui/projects-accordion/projects-accordion.component';


@NgModule({
    declarations: [
        CvGenButtonComponent,
        CvTableComponent,
        CvInputComponent,
        CvGenSelectComponent,
        CvGenDatepickerComponent,
        CvGenTextareaComponent,
        CvGenProjectFormComponent,
        ProjectsAccordionComponent,
    ],
    imports: [
        MatButtonModule,
        MatTableModule,
        MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
        CdkAccordionModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
    
    ],
    exports: [
        CvGenButtonComponent,
        CvTableComponent,
        CvInputComponent,
        CvGenSelectComponent,
        CvGenDatepickerComponent,
        CvGenTextareaComponent,
        CvGenProjectFormComponent,
        ProjectsAccordionComponent,
    ],
    providers: [MatIconRegistry]
})
export class SharedModule { }