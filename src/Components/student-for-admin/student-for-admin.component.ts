import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IStudent } from '../../models/istudent';
import { AdminDashboardServiceService } from '../../Services/AdminDashboard/admin-dashboard-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-for-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-for-admin.component.html',
  styleUrl: './student-for-admin.component.css'
})
export class StudentForAdminComponent implements OnInit {

  constructor(private admindashboardservice:AdminDashboardServiceService,
    private router:Router
  ){}

  ngOnInit(): void {
    this.GetAllStudents()
  }
ListOfStudents:IStudent[]=[]

GetAllStudents()
{
  this.admindashboardservice.GetAllStudents().subscribe(
    (data: IStudent[]) => {
      console.log(data)
      this.ListOfStudents = data;
    },
    (error) => {
      console.error('Error fetching Students', error);
    }
  );
}
GoToStudentrDetails(id: Number) {
  this.router.navigate(['/layout-dashboard/StudentDetails', id]);
}

DeleteStudent(id:Number)
  {
    this.admindashboardservice.DeleteStudent(id).subscribe(
      () => {
        this.GetAllStudents();
      },
      (error) => {
        console.error(error);
      }
    );

  }
}
