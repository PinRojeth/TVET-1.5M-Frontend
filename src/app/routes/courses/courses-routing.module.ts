import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './components/courses/courses.component';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent
  },
  {
    path: 'create',
    component: CreateCourseComponent
  },
  {
    path: 'edit/:courseId',
    component: CreateCourseComponent
  },
  {
    path: 'info/:courseId',
    component: CourseInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
