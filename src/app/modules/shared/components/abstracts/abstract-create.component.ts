import { Notyf }                                from 'notyf';
import { FuseConfirmationService }              from '@fuse/services/confirmation';
import { inject }                               from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

export abstract class AbstractCreateComponent<T> {
  protected confirmationService: FuseConfirmationService = inject(FuseConfirmationService);
  protected formBuilder: UntypedFormBuilder = inject(UntypedFormBuilder);
  protected notyf = new Notyf();
  protected form: UntypedFormGroup;

  protected constructor(
    private readonly service: { create: (data: any) => any },
  ) {
    this.initForm();
  }

  abstract initForm(): void;

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.form.disable();
    this.service.create(this.form.getRawValue())
      .then(() => {
        this.form.enable();
        this.form.reset();
        this.notyf.success('Created successfully');
      })
      .catch(() => {
        this.form.enable();
        this.notyf.error('Error creating');
      });
  }
}
