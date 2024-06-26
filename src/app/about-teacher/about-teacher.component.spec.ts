import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutTeacherComponent } from './about-teacher.component';

describe('AboutTeacherComponent', () => {
  let component: AboutTeacherComponent;
  let fixture: ComponentFixture<AboutTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutTeacherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
