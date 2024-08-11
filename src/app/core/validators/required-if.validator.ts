import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export function requiredIf(predicate: () => boolean): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.parent) {
      return null;
    }

    // If the predicate is true, then the control is required and update the validators
    if (predicate()) {
      control.setValidators(Validators.required);
      control.updateValueAndValidity();
      return Validators.required(control);
    } else {
      // If the predicate is false, then the control is not required and remove the validators
      control.clearValidators();
      control.updateValueAndValidity();
      return null;
    }
  };
}
