import { ValidatorFn, AbstractControl } from '@angular/forms';

export function datePickerValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let forbidden = true;

    if (!control?.errors?.matDatepickerParse || !control?.errors?.invalidDateFormat) {
      forbidden = false;
    } else {
      forbidden = true;
    }
    return forbidden ? { 'invalidDateFormat': true } : null;
  };
}
