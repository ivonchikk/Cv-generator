import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvGenProjectFormComponent } from './cv-gen-project-form.component';

describe('CvGenProjectFormComponent', () => {
  let component: CvGenProjectFormComponent;
  let fixture: ComponentFixture<CvGenProjectFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CvGenProjectFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvGenProjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
