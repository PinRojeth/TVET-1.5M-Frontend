import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './components/courses/courses.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ZippyModule } from 'src/app/shares/zippy/zippy.module';
import { TableModule } from 'src/app/shares/table/table.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { StatusPipeModule } from "../../shares/status-pipe/status-pipe.module";
import { RoleModule } from "../../shares/role/role.module";
import { FilteringModule } from 'src/app/shares/filtering/filtering.module';
import { CreateCourseComponent } from './components/create-course/create-course.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatQuillModule } from 'src/app/shares/mat-quill/mat-quill-module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { TranslateApiModule } from "../../shares/translate-api/translate-api.module";
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { SearchbarInSelectOptionModule } from 'src/app/shares/searchbar-in-select-option/searchbar-in-select-option.module';
import { StaticFileModule } from "../../shares/static-file/static-file.module";
import { MatTabsModule } from '@angular/material/tabs';
import { NameModule } from "../../shares/name/name.module";
import { TableStudentListComponent } from './components/table-student-list/table-student-list.component';
import { TableStudentFemaleComponent } from './components/table-student-female/table-student-female.component';


@NgModule({
    declarations: [
        CoursesComponent,
        CreateCourseComponent,
        CourseInfoComponent,
        TableStudentListComponent,
        TableStudentFemaleComponent
    ],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [
        DatePipe
    ],
    imports: [
        CommonModule,
        CoursesRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        ZippyModule,
        TableModule,
        ReactiveFormsModule,
        TranslateModule,
        StatusPipeModule,
        RoleModule,
        FilteringModule,
        MatProgressSpinnerModule,
        MatQuillModule,
        MatDatepickerModule,
        MatSelectModule,
        MatOptionModule,
        TranslateApiModule,
        SearchbarInSelectOptionModule,
        StaticFileModule,
        MatTabsModule,
        NameModule
    ]
})
export class CoursesModule { }
