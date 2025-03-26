import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvGenDatepickerComponent } from './cv-gen-datepicker.component';

describe('CvGenDatepickerComponent', () => {
  let component: CvGenDatepickerComponent;
  let fixture: ComponentFixture<CvGenDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CvGenDatepickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvGenDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
