import { Notyf }                   from 'notyf';
import { mergeMap, Observable }    from 'rxjs';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { inject }                  from '@angular/core';
import { TranslocoService }        from '@ngneat/transloco';

export abstract class AbstractListComponent<T> {
  public items$: Observable<T[]>;
  abstract columns: Array<keyof T | string>;
  protected _notyf = new Notyf();
  protected confirmationService: FuseConfirmationService = inject(FuseConfirmationService);
  protected translationService: TranslocoService = inject(TranslocoService);

  protected constructor(
    private readonly service: { delete: (id: string) => any },
    private readonly items: any,
  ) {
    this.items$ = items;
  }

  abstract edit(item: T): void;

  delete(item: T) {
    const confirmation = this.confirmationService.open({
      title  : this.translationService.translate('modal.delete-confirmation.title'),
      message: this.translationService.translate('modal.delete-confirmation.message'),
      actions: {
        confirm: {
          label: this.translationService.translate('modal.delete-confirmation.confirm'),
        },
        cancel : {
          label: this.translationService.translate('modal.delete-confirmation.cancel'),
        }
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
