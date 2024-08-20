import { Component }                         from '@angular/core';
import { MatIcon }                           from '@angular/material/icon';
import { MatIconButton }                     from '@angular/material/button';
import { TranslocoDirective, TranslocoPipe } from '@ngneat/transloco';
import { PageDetailHeaderComponent }         from '@modules/shared/components/page-detail-header/page-detail-header.component';
import { MatStepperModule }                  from '@angular/material/stepper';
import { ReactiveFormsModule }               from '@angular/forms';
import { MatFormFieldModule }                from '@angular/material/form-field';
import { MatAutocompleteModule }             from '@angular/material/autocomplete';
import { MatInput }                          from '@angular/material/input';
import { NgForOf }                           from '@angular/common';
import { MatDivider }                        from '@angular/material/divider';

@Component({
  selector   : 'app-create',
  standalone : true,
  imports    : [
    MatIcon,
    MatIconButton,
    TranslocoDirective,
    PageDetailHeaderComponent,
    TranslocoPipe,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInput,
    NgForOf,
    MatDivider
  ],
  templateUrl: './create.component.html'
})
export class CreateComponent {

}
