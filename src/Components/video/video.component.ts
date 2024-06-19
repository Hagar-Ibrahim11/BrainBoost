import { Component, OnInit } from '@angular/core';
import { VidService } from '../../Services/vid.service';
import { IVideoState } from '../../models/ivideo-state';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { CourseService } from '../../Services/course/course.service';
import { IState } from '../../models/someCourseTakingModels/istate';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './video.component.html',
  styleUrl: './video.component.css'
})
export class VideoComponent implements OnInit {
  CourseId!:number
  comingVideo!: IVideoState[]
  contLink: string='http://localhost:43827/Images/Videos/'
  vidLink!:string|null
  isfinish: boolean = true
  state!:IState
  constructor(private videoService:VidService,private courseService:CourseService,private route:ActivatedRoute){
    this.route.params.subscribe(params => {
      this.CourseId = +params['id']; // Convert to number (if needed)
      console.log(this.CourseId)
    });
  }
  ngOnInit(): void {
   this.GetVideos(this.CourseId)
   this.getAllstates(this.CourseId)
  }
  GetVideos(id :number)
  {
    this.videoService.GetTakingVideos(id).subscribe({

      next: (data: IVideoState[]) => {
        this.comingVideo = data;
      console.log(  this.comingVideo)
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
      },
      complete: () => {
        console.log('videos fetched successfully');
      },
    });
  }
  handleLink(video:IVideoState)
  {
    debugger
    if(video.state==false)
      {
        this.changeState(video.id,true)

      }
        this.vidLink = video.videoUrl;
        this.comingVideo.forEach(video =>{
          //
          if(video.state==false)
            {
                this.isfinish=false
            }
        })
        //
        if(this.isfinish==true&& this.state.hasFinishedallVideos==false)
          {
            this.changeAllState(this.CourseId,true)
          }


  }
  changeState(id: number, state: boolean) {
    this.videoService.changeVideoState(id, state).subscribe({
      
    });
  }

  changeAllState(id:number,state:boolean)
  {
    this.videoService.changeAllVideoState(id,state).subscribe({
      next: (data: any) => {
        this.getAllstates(this.CourseId)
      }
    })

  }
  getAllstates(id:number)
  {
    this.courseService.getStates(id).subscribe({
      next: (data: IState) => {
        this.state = data;

      },
      error: (error) => {
        console.error('Error fetching courses:', error);
      },
      complete: () => {
        console.log('videos fetched successfully');
      },
    })
  }

}
