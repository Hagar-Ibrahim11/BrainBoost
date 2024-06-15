import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoTakingComponent } from './video-taking.component';

describe('VideoTakingComponent', () => {
  let component: VideoTakingComponent;
  let fixture: ComponentFixture<VideoTakingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoTakingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoTakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
