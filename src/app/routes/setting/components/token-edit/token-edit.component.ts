import { Component, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { pAdmin } from 'src/app/helpers/permission';
import { DESTROYER$ } from 'src/app/helpers/unsubscribe';
import { NSAFToken } from 'src/app/models/nsaf-token';
import { NsafTokenService } from 'src/app/services/nsaf-token.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-token-edit',
  templateUrl: './token-edit.component.html',
  styleUrls: ['./token-edit.component.scss']
})
export class TokenEditComponent {
  private destroyer$ = DESTROYER$();

  private tokenService = inject(NsafTokenService);
  private readonly snackbarService = inject(SnackbarService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  pToken = pAdmin.systemConfig;
  token: NSAFToken;

  nsaf_token: FormControl = new FormControl(null, Validators.required);

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad(): void {
    this.tokenService
      .getOne()
      .pipe(takeUntil(this.destroyer$))
      .subscribe({
        next: res => {
          this.token = res;
          this.nsaf_token.setValue(res.nsaf_token);
        }
      });
  }

  onSubmit() {
    this.nsaf_token.markAllAsTouched();
    if (!this.nsaf_token.valid) return;

    this.tokenService
      .updateToken({ nsaf_token: this.nsaf_token.value })
      .pipe(takeUntil(this.destroyer$))
      .subscribe({
        next: () => {
          this.router.navigate(['..'], { relativeTo: this.route });
          this.snackbarService.onShowSnackbar({ message: 'edit' });
        }
      });
  }
}
