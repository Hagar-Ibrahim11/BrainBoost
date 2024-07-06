import { Component, OnInit } from '@angular/core';
import { ITeacher } from '../../models/iteacher';
import { Router } from '@angular/router';
import { AdminDashboardServiceService } from '../../Services/AdminDashboard/admin-dashboard-service.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-teachers-for-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teachers-for-admin.component.html',
  styleUrl: './teachers-for-admin.component.css'
})
export class TeachersForAdminComponent implements OnInit {

constructor(
  private router:Router,
  private admindashboardservice:AdminDashboardServiceService

){}

ListOfTeachers:ITeacher[]=[]
ngOnInit(): void {
  this.GetAllTeachers()
}
GetAllTeachers()
{
  this.admindashboardservice.GetAllTeachers().subscribe(
    (data: ITeacher[]) => {
      this.ListOfTeachers = data;
    },
    (error) => {
      console.error('Error fetching Teachers', error);
    }
  );
}
GoToTeacherDetails(id: Number) {
  this.router.navigate(['/layout-dashboard/TeacherDetails', id]);
}

DeleteTeacher(TeacherId:Number)
  {
    this.admindashboardservice.DeleteTeacher(TeacherId).subscribe(
      () => {
        this.GetAllTeachers();
      },
      (error) => {
        console.error(error);
      }
    );

  }
}
