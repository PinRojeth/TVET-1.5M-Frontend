import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function TimeValidator(startTime: string, endTime: string) {
  return (formGroup: FormGroup) => {
    const start = formGroup.controls[startTime];
    const end = formGroup.controls[endTime];

    if (end.errors && !end.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (
      (start.value !== null || start.value !== undefined) &&
      (end.value !== null || end.value !== undefined) &&
      start.value >= end.value
    ) {
      end.setErrors({ mustMatch: true });
    } else {
      end.setErrors(null);
    }
  };
}
