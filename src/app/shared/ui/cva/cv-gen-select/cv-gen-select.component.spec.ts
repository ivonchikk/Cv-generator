import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvGenSelectComponent } from './cv-gen-select.component';

describe('CvGenSelectComponent', () => {
  let component: CvGenSelectComponent;
  let fixture: ComponentFixture<CvGenSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CvGenSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvGenSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
