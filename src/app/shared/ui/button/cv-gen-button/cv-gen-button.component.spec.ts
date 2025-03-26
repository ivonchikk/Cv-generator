import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CvGenButtonComponent } from './cv-gen-button.component';



describe('BlueButtonComponent', () => {
  let component: CvGenButtonComponent;
  let fixture: ComponentFixture<CvGenButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CvGenButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvGenButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
