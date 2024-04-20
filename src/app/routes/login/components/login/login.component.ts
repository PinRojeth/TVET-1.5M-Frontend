import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Unsubscribe } from 'src/app/helpers/unsubscribe';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends Unsubscribe {
  public loginForm: FormGroup;
  public isLoading = false;
  hide = true;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    super();
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      platform: ['studio', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.isLoading = true;
    this.authService
      .login(this.loginForm.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        error: err => {
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
          this.router.navigate(['']);
        }
      });
  }
}
