import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordMatcher(password: string, confirm_password: string) {
  return (control: AbstractControl): ValidationErrors | null => {

    const passwordControl = control.get(password);
    const confirmPasswordControl = control.get(confirm_password);

    if (!passwordControl || !confirmPasswordControl) return null;

    if (passwordControl.value === confirmPasswordControl.value) {
      confirmPasswordControl.setErrors(null);
    } else {
      confirmPasswordControl.setErrors({ nomatch: true });
    }
    return null;
  };
}
