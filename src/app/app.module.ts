import { HttpClientModule } from '@angular/common/http';
import { EmployeesRoutingModule } from './modules/employees/employees-routing.module';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { provideState, provideStore, StoreModule } from '@ngrx/store';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { employeesReducer } from './ngrx/employees/employees.reducer';

import { HeaderComponent } from './basic_sections/header/header.component';
import { NavigationComponent } from './basic_sections/navigation/navigation.component';
import { BreadcrumbComponent } from './basic_sections/breadcrumb/breadcrumb.component';

import { EmployeesModule } from './modules/employees/employees.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CommonModule } from '@angular/common';
import { EmployeesEffects } from './ngrx/employees/employees.effects';
import { cvReducer } from './ngrx/cvs/cvs.reducers';
import { CvEffects } from './ngrx/cvs/cvs.effects';
import { projectReducer } from './ngrx/projects/projects.reducers';
import { ProjectsEffects } from './ngrx/projects/projects.effects';






@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    BreadcrumbComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreModule.forRoot({employees: employeesReducer, cvs: cvReducer, projects: projectReducer}),
    EffectsModule.forRoot(EmployeesEffects, CvEffects, ProjectsEffects),
    HttpClientModule,
    // EmployeesModule,
    // ProjectsModule,
    EmployeesRoutingModule,
  ],
  providers: [
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
