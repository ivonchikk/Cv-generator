import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvGenTextareaComponent } from './cv-gen-textarea.component';

describe('CvGenTextareaComponent', () => {
  let component: CvGenTextareaComponent;
  let fixture: ComponentFixture<CvGenTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CvGenTextareaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvGenTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
