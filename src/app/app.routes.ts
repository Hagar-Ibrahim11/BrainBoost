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
import { VideoComponent } from '../Components/video/video.component';
import { EnrollmentSuccessComponent } from '../Components/EnrollmentSuccess/enrollment-success/enrollment-success.component';


import { EarningComponent } from '../Components/earning/earning/earning.component';
import { InstructorProfileComponent } from '../Components/instructor-profile/instructor-profile.component';
import { NonApprovedCouresesComponent } from '../Components/non-approved-coureses/non-approved-coureses.component';
import { CoursesForAdminComponent } from '../Components/courses-for-admin/courses-for-admin/courses-for-admin.component';
import { VideotakingComponent } from '../Components/Taking-Course/video-taking/videotaking/videotaking.component';
import { TestComponent } from '../Components/test/test.component';


import { TeachersForAdminComponent } from '../Components/teachers-for-admin/teachers-for-admin.component';
import { StudentForAdminComponent } from '../Components/student-for-admin/student-for-admin.component';
import { TeacherEarningDetailsComponent } from '../Components/teacher-earning-details/teacher-earning-details.component';
import { StudentDetailsComponent } from '../Components/student-details/student-details.component';
import { TeacherDetailsComponent } from '../Components/teacher-details/teacher-details.component';
import { AdminComponent } from '../Components/Admin/admin/admin.component';
import { CategoryComponent } from '../Components/category/category.component';
import { ModifiedQuizComponent } from '../Components/modified-quiz/modified-quiz.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'TeacherForm/:id', component: InstructorProfileComponent },
  { path: 'StudentForm/:id', component: InstructorProfileComponent },
  { path: 'addCourse', component: AddCourseComponent },
  { path: 'Test', component: TestComponent },
  {
    path: 'EnrollmentSuccess/:orderNumber/:courseId',
    component: EnrollmentSuccessComponent,
  },

  { path: 'TakingCourse/:id', component: CourseContentComponent },
  { path: 'TakingQuiz/:id', component: ModifiedQuizComponent },
  { path: 'TakingCertificate/:id', component: CertificateComponent },
  { path: 'TakingVideo/:id', component: VideoComponent },
  { path: 'TakingVideo', component: VideotakingComponent },

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'courseDetails/:id', component: CourseDetailsComponent },
      { path: 'nonApprovedCourses', component: NonApprovedCouresesComponent },
      { path: 'earning', component: EarningComponent },
      { path: 'courses-for-admin', component: CoursesForAdminComponent },
      { path: 'teachersforadmin', component: TeachersForAdminComponent },
      { path: 'studentsforadmin', component: StudentForAdminComponent },
      {
        path: 'TeacherEarningDetails/:id',
        component: TeacherEarningDetailsComponent,
      },
      { path: 'StudentDetails/:id', component: StudentDetailsComponent },
      { path: 'TeacherDetails/:id', component: TeacherDetailsComponent },
      {path: "admin",component:AdminComponent},
      {path: "category",component:CategoryComponent}
    ],
  },

  { path: 'admindashboard', component: AdminDashboardComponent },

  { path: 'pricing', component: PricingComponent },
  { path: '**', component: NotFoundComponent },
];
function getRandom() {
  throw new Error('Function not implemented.');
}
