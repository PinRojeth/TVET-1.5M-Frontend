import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { pAdmin } from 'src/app/helpers/permission';
import { Department } from 'src/app/models/department';
import { DepartmentService } from 'src/app/services/department.service';
import { DialogService } from 'src/app/services/dialog.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { SnackbarComponent } from 'src/app/shares/snackbar/components/snackbar/snackbar.component';

@Component({
  selector: 'app-department-info',
  templateUrl: './department-info.component.html',
  styleUrls: ['./department-info.component.scss']
})
export class DepartmentInfoComponent {
  pDepartment = pAdmin.userDepartment;
  departmentId: string;
  info: Department;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private departmentService: DepartmentService,
    private dialogService: DialogService,
    private snackbarService: SnackbarService
  ) {
    this.departmentId = this.route.snapshot.paramMap.get('id');
  }
  
  ngOnInit(): void {
    this.getInfo();
  }

  getInfo() {
    this.departmentService.getById(this.departmentId).subscribe({
      next: (res) => {
        this.info = res;
      }
    });
  }

  onDelete() {
    this.dialogService
      .onShowDialog({
        title: 'លុបគ្រប់គ្រងស្ថាប័ន',
        message: 'តើអ្នកពិតជាចង់លុបគ្រប់គ្រងស្ថាប័ននេះមែនទេ?'
      })
      .afterClosed()
      .subscribe(res => {
        if (res === 'confirm') {
          this.departmentService.delete(this.departmentId).subscribe({
            next: () => {
              this.snackbarService.onShowSnackbar({ message: 'delete', component: SnackbarComponent });
              this.router.navigate(['../../'], { relativeTo: this.route });
            }
          });
        }
      });
  }
}
