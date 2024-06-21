import { Routes } from '@angular/router';
import { LoginComponent } from '../Components/login/login.component';
import { RegisterComponent } from '../Components/register/register.component';
import { LayoutComponent } from '../Components/layout/layout.component';
import { HomeComponent } from '../Components/home/home.component';
import { CoursesComponent } from '../Components/courses/courses.component';
import { CourseDetailsComponent } from '../Components/course-details/course-details.component';
import { NotFoundComponent } from '../Components/not-found/not-found.component';
import { AddCourseComponent } from '../Components/add-course/add-course.component';
import { PricingComponent } from '../Components/pricing/pricing.component';
import { AdminDashboardComponent } from '../Components/admin-dashboard/admin-dashboard.component';
import { CourseContentComponent } from '../Components/Taking-Course/course-content/course-content.component';
import { QuizTakingComponent } from '../Components/Taking-Course/quiz-taking/quiz-taking.component';
import { CertificateComponent } from '../Components/Taking-Course/certificate/certificate.component';
import { EnrollmentSuccessComponent } from '../Components/EnrollmentSuccess/enrollment-success/enrollment-success.component';
import { InstructorProfileComponent } from '../Components/instructor-profile/instructor-profile.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'teacherForm', component: InstructorProfileComponent },
  { path: 'addCourse', component: AddCourseComponent },
  { path: 'TakingCourse', component: CourseContentComponent },
  { path: 'TakingQuiz', component: QuizTakingComponent },
  { path: 'TakingCertificate', component: CertificateComponent },
  {
    path: 'EnrollmentSuccess/:orderNumber/:courseId',
    component: EnrollmentSuccessComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'courseDetails', component: CourseDetailsComponent },
    ],
  },
  { path: 'admindashboard', component: AdminDashboardComponent },
  { path: 'pricing', component: PricingComponent },
  { path: '**', component: NotFoundComponent },
];
