import { Routes } from '@angular/router';
import { LoginComponent } from '../Components/login/login.component';
import { RegisterComponent } from '../Components/register/register.component';
import { LayoutComponent } from '../Components/layout/layout.component';
import { HomeComponent } from '../Components/home/home.component';
import { CoursesComponent } from '../Components/courses/courses.component';
import { CourseDetailsComponent } from '../Components/course-details/course-details.component';
import { NotFoundComponent } from '../Components/not-found/not-found.component';

export const routes: Routes = 
[
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
      path: '',
      component: LayoutComponent,
      children: [
        { path: 'home', component: HomeComponent },
        { path: 'courses', component: CoursesComponent },
        { path: 'courseDetails', component: CourseDetailsComponent },
      ]
    },
    { path:"**",component:NotFoundComponent},
  ];
