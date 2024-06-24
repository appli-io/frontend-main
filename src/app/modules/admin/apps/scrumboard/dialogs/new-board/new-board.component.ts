import { Component, OnDestroy, OnInit }                                          from '@angular/core';
import { CdkTextareaAutosize }                                                   from '@angular/cdk/text-field';
import { MatError, MatFormField, MatLabel }                                      from '@angular/material/form-field';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatInput }                                                              from '@angular/material/input';
import { MatIcon }                                                               from '@angular/material/icon';
import { MatButton, MatIconButton }                                              from '@angular/material/button';
import { TranslocoDirective, TranslocoService }                                  from '@ngneat/transloco';
import { MatProgressSpinner }                                                    from '@angular/material/progress-spinner';
import { JsonPipe, NgIf }                                                        from '@angular/common';
import { Notyf }                                                                 from 'notyf';
import { MatDialogRef }                                                          from '@angular/material/dialog';
import { MatAutocomplete, MatAutocompleteTrigger, MatOption }                    from '@angular/material/autocomplete';
import { MatSelectAutocompleteComponent }                                        from '@libs/ui/mat-select-autocomplete/mat-select-autocomplete.component';
import { ScrumboardService }                                                     from '@modules/admin/apps/scrumboard/pages/services/scrumboard.service';
import { Subject, takeUntil }                                                    from 'rxjs';

@Component({
  selector   : 'app-new-board',
  standalone : true,
  imports    : [
    CdkTextareaAutosize,
    MatLabel,
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    MatIcon,
    MatIconButton,
    TranslocoDirective,
    MatButton,
    MatProgressSpinner,
    NgIf,
    MatError,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatOption,
    MatSelectAutocompleteComponent,
    JsonPipe
  ],
  templateUrl: './new-board.component.html'
})
export class NewBoardComponent implements OnInit, OnDestroy {
  boardForm: UntypedFormGroup;
  notyf = new Notyf();

  private readonly _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    public readonly _matDialogRef: MatDialogRef<NewBoardComponent>,
    private readonly _translocoService: TranslocoService,
    private readonly _formBuilder: UntypedFormBuilder,
    private readonly _scrumboardService: ScrumboardService
  ) {}

  ngOnInit() {
    this.boardForm = this._formBuilder.group({
      name       : [ '', Validators.required ],
      description: [ '', Validators.required ],
      members    : [ [] ]
    });
  }

  ngOnDestroy() {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  save() {
    if (this.boardForm.invalid) {
      this.notyf.error('Please fill all required fields');
      return;
    }

    this.boardForm.disable();

    this._scrumboardService.createBoard(this.boardForm.getRawValue())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe({
        next : (result) => {
          this.notyf.success('Board created successfully');
          this._matDialogRef.close();
        },
        error: (error) => {
          this.notyf.error('Error creating board');
          this.boardForm.enable();
        }
      });

    this._matDialogRef.close(this.boardForm.value);
  }
}
