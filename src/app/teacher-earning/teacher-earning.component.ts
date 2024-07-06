import { Component, Input } from '@angular/core';
import { TeacherService } from '../../Services/teacher/teacher.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacher-earning',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teacher-earning.component.html',
  styleUrl: './teacher-earning.component.css',
})
export class TeacherEarningComponent {
  @Input() teacherCourses!: any[];
  constructor(private teacherService: TeacherService) {}
}
