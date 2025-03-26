import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpCvComponent } from './emp-cv.component';

describe('EmpCvComponent', () => {
  let component: EmpCvComponent;
  let fixture: ComponentFixture<EmpCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpCvComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
