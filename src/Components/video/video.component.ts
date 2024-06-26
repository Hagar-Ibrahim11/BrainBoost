import { Component, OnInit } from '@angular/core';
import { VidService } from '../../Services/vid.service';
import { IVideoState } from '../../models/ivideo-state';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { CourseService } from '../../Services/course/course.service';
import { IState } from '../../models/someCourseTakingModels/istate';
import { IGetComment } from '../../models/videomodel/iget-comment';
import { IAddcomment } from '../../models/videomodel/iaddcomment';
import { environment } from '../../Enviroment/enviroment';

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
  Allcomments!:IGetComment[]
  AddingComment!:IAddcomment
  contLink: string='http://localhost:43827/Images/Videos/'
  vidLink!:string|null
  vidIndex:number=0;
  vidId!:number
  isfinish: boolean = true
  state!:IState
  chapters:number[]=[]
  env:string=environment.baseUrl
  constructor(private videoService:VidService,private courseService:CourseService,private route:ActivatedRoute,private router:Router) {
    this.route.params.subscribe(params => {
      this.CourseId = +params['id']; // Convert to number (if needed)
      console.log(this.CourseId)
    });
    this.AddingComment={
      content:"",
      id:0,
      videoId:0
     }
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
          this.comingVideo.forEach(video =>{
            this.chapters.push(video.chapter)
          })
          this.chapters = [...new Set(this.chapters)];
          this.chapters.sort((a, b) => a - b);
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
      },
      complete: () => {
        console.log('videos fetched successfully');
      },
    });
  }
  handleLink(video:IVideoState,index:number)
  {
    this.vidLink = video.videoUrl;
    this.vidIndex=index
    this.vidId = video.id
     this.getComment(video.id)
    if(video.state==false)
      {
        this.changeState(video.id,true)

      }

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
  navigateToCourse(CrsId:number){
    this.router.navigate(['/TakingCourse', CrsId]);
  }
  moveForword()
  {
    this.vidIndex++;
    this.handleLink(this.comingVideo[this.vidIndex],this.vidIndex)

  }
  moveback()
  {
    this.vidIndex--;
    this.handleLink(this.comingVideo[this.vidIndex],this.vidIndex)

  }
  bindComment(comment:any)
  {
    this.AddingComment.content=comment.target.value
    console.log(this.AddingComment.content)
  }
  addNewcomment(inputElement: HTMLInputElement)
    {
      this.AddingComment.videoId=this.vidId
     this.addcomment(this.AddingComment)
      inputElement.value=""
    }

  getComment(id:number)
  {
    this.videoService.GetComments(id).subscribe({
      next: (data: IGetComment[]) => {
        this.Allcomments = data;

      },
      error: (error) => {
        console.error('Error fetching courses:', error);
      },
      complete: () => {
        console.log('videos fetched successfully');
      },
    })
  }
  addcomment(comment:IAddcomment)
  {
    this.videoService.AddComments(comment).subscribe({
      next: (data: IGetComment[]) => {
        this.Allcomments = data;

      },
      error: (error) => {
        console.error('Error fetching courses:', error);
      },
      complete: () => {
        console.log('videos fetched successfully');
      },
    })
  }
  getChapters()
  {

  }
}
