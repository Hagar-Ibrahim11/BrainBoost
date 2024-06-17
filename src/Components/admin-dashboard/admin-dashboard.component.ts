import { Component, OnInit } from '@angular/core';
import { AdminDashboardServiceService } from '../../Services/AdminDashboard/admin-dashboard-service.service';
import { ITopTeacher } from '../../models/itop-teacher';
import { CommonModule } from '@angular/common';
import { ICurrentCourses } from '../../models/icurrent-courses';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  constructor(private admindashboardservice:AdminDashboardServiceService) {
  }
  NumOfStudent!:Number
  NumOfCourse!:Number
  NumOfTeacher!:Number
  TopTeacher!:ITopTeacher[]
  CurrentCourses!:ICurrentCourses[]
  ngOnInit(): void {
    this.GetTotalNumOfStudent()
    this.GetTotalNumOfCourse()
    this.GetTotalNumOfTeacher()
    this.GetTopTeacher()
    this.GetCurrentCourses()
  }

  GetTotalNumOfStudent() {
    this.admindashboardservice.GetNumOfStudent().subscribe(
      (data: Number) => {
        this.NumOfStudent = data;
      },
      (error) => {
        console.error('Error fetching Num of Student', error);
      }
    );
  }

  GetTotalNumOfCourse() {
    this.admindashboardservice.GetNumOfCourse().subscribe(
      (data: Number) => {
        this.NumOfCourse = data;
      },
      (error) => {
        console.error('Error fetching Num of Course', error);
      }
    );
  }

  GetTotalNumOfTeacher() {
    this.admindashboardservice.GetNumOfTeacher().subscribe(
      (data: Number) => {
        this.NumOfTeacher = data;
      },
      (error) => {
        console.error('Error fetching Num of Teacher', error);
      }
    );
  }

  GetTopTeacher() {
    this.admindashboardservice.GetTopTeacher().subscribe(
      (data: ITopTeacher[]) => {
        this.TopTeacher = data;
      },
      (error) => {
        console.error('Error fetching Top Teachers', error);
      }
    );
  }

  GetCurrentCourses() {
    this.admindashboardservice.GetCurrentCourses().subscribe(
      (data: ICurrentCourses[]) => {
        this.CurrentCourses = data;
      },
      (error) => {
        console.error('Error fetching Current Courses', error);
      }
    );
  }
}
