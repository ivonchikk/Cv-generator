import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsAccordionComponent } from './projects-accordion.component';

describe('ProjectsAccordionComponent', () => {
  let component: ProjectsAccordionComponent;
  let fixture: ComponentFixture<ProjectsAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectsAccordionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
