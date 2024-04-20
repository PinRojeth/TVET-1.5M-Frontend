import { AbstractControl, FormGroup } from '@angular/forms';
type Dictionary = {
  [key: string]: AbstractControl;
};
export class TypeSafeFromGroup<ControlType extends Dictionary, ValueType = any> extends FormGroup {
  constructor(controls: ControlType, options: { [key: string]: any }) {
    super(controls, options);
  }
  value!: ValueType;
  controls!: ControlType;
}
