import { Notyf }                   from 'notyf';
import { mergeMap }                from 'rxjs';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { inject }                  from '@angular/core';

export abstract class AbstractCreateComponent<T> {
  abstract columns: Array<keyof T | string>;
  protected _notyf = new Notyf();
  protected confirmationService: FuseConfirmationService = inject(FuseConfirmationService);

  protected constructor(
    private readonly service: { delete: (id: string) => any },
  ) {}

  abstract edit(item: T): void;

  delete(item: T) {
    const confirmation = this.confirmationService.open({
      title  : 'Delete item',
      message: 'Are you sure you want to delete this item? This action cannot be undone.',
      actions: {
        confirm: {
          label: 'Delete',
        },
      },
    });

    confirmation.afterClosed()
      .pipe(
        mergeMap((result) => result === 'confirmed' ? this.service.delete(item['id']) : [])
      )
      .subscribe({
        next : () => this._notyf.success('Item deleted'),
        error: (error) => this._notyf.error('Error deleting item'),
      });
  }
}
