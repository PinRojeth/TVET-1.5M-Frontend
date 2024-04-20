import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/internal/operators/delay';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { DESTROYER$ } from 'src/app/helpers/unsubscribe';
import { Cms } from 'src/app/models/cms';
import { CmsService } from 'src/app/services/cms.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-cms-edit',
  templateUrl: './cms-edit.component.html',
  styleUrls: ['./cms-edit.component.scss']
})
export class CmsEditComponent {
  private destroyer$ = DESTROYER$();

  form: FormGroup;

  color: string[] = ['', '#f1b20c', '#fc7e7e', '#194f82', '#ff755f', '#ad5389', '#a6a7ae'];

  modules = {
    toolbar: [[{ 'color': this.color }]]
  };

  imageName: string;
  latestHtml: any;
  cmsId: string;

  isLoading: boolean;
  isLoaded: boolean = false;

  constructor(
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private cmsService: CmsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.cmsId = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.onInitForm();
    this.onLoad();
  }

  onInitForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onLoad() {
    this.cmsService
      .getCms()
      .pipe(delay(500), takeUntil(this.destroyer$))
      .subscribe({
        next: res => {
          this.form.patchValue({
            name: res.name,
            description: res.description
          });
        }
      });
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (!this.form.valid) return;

    this.isLoading = true;

    const formValue = this.form.value;
    const data = {
      ...formValue
    };

    if (this.cmsId) {
      // on update
      const updateDate = {
        ...data
      };
      this.updateCms(updateDate);
    }
  }

  updateCms(data: Cms) {
    this.cmsService
      .updateCms(data)
      .pipe(takeUntil(this.destroyer$))
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['../../setting/cms']);
          this.snackbarService.onShowSnackbar({ message: 'edit' });
        }
      });
  }

  editorInit(quill: any) {
    // Add a matcher for the Node.ELEMENT_NODE type.
    quill.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {
      // Remove all attributes from the pasted node.
      if (this.isLoaded) {
        delta.forEach(e => {
          if (e.attributes) {
            e.attributes = {};
          }
        });
      }

      setTimeout(() => {
        this.isLoaded = true;
      }, 0);
      // Return the updated delta.
      return delta;
    });
  }
}
