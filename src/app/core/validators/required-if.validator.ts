import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export function requiredIf(predicate: () => boolean): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.parent) {
      return null;
    }

    return predicate() ? Validators.required(control) : null;
  };
}
