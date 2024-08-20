import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatIcon }                                                           from '@angular/material/icon';
import { MatIconButton }                                                     from '@angular/material/button';
import { TranslocoDirective, TranslocoPipe }                                 from '@ngneat/transloco';
import { PageDetailHeaderComponent }                                         from '@modules/shared/components/page-detail-header/page-detail-header.component';
import { MatStepperModule }                                                  from '@angular/material/stepper';
import { ReactiveFormsModule }                                               from '@angular/forms';
import { MatFormFieldModule }                                                from '@angular/material/form-field';
import { MatAutocompleteModule }                                             from '@angular/material/autocomplete';
import { MatInput }                                                          from '@angular/material/input';
import { AsyncPipe, NgForOf }                                                from '@angular/common';
import { MatDivider }                                                        from '@angular/material/divider';
import { displayWithFn, filterByValue }                                      from '@core/utils';
import { BenefitsService }                                                   from '@modules/admin/admin/benefits/services/benefits.service';
import { BenefitCategoryService }                                            from '@modules/admin/admin/benefits/services/benefit-category.service';
import { BehaviorSubject, map, Subject, switchMap, take }                    from 'rxjs';
import { BenefitCategory }                                                   from '@modules/admin/admin/benefits/models/benefit-category';
import { LayoutEnum }                                                        from '@core/enums/layout.enum';
import { MatDialog }                                                         from '@angular/material/dialog';
import { CategoryNewComponent }                                              from '@modules/admin/admin/benefits/dialogs/category-new/category-new.component';

@Component({
  selector       : 'app-create',
  standalone     : true,
  imports        : [
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
    MatDivider,
    AsyncPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl    : './create.component.html'
})
export class CreateComponent implements OnInit {
  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;
  protected readonly displayWithFn = displayWithFn;
  private _filterCategorySubject: Subject<string> = new Subject<string>();

  constructor(
    private readonly _benefitsService: BenefitsService,
    private readonly _benefitCategoryService: BenefitCategoryService,
    private readonly _matDialog: MatDialog
  ) {}

  private _categories$: BehaviorSubject<BenefitCategory[]> = new BehaviorSubject<BenefitCategory[]>([]);

  get categories$() {
    return this._categories$.asObservable();
  }

  private _categoriesFiltered$: BehaviorSubject<BenefitCategory[]> = new BehaviorSubject<BenefitCategory[]>([]);

  get categoriesFiltered$() {
    return this._categoriesFiltered$.asObservable();
  }

  ngOnInit() {
    this._loadCategories();

    this._filterSubjectSub();
  }

  filter(field: 'category' | 'company', target: any) {
    console.log(field, target);
    switch (field) {
      case 'category': {
        this._filterCategorySubject.next(target.value);
        break;
      }
    }
  }

  onCategorySelect(category: BenefitCategory) {
    console.log(category);

    if (category.id === '') {
      console.log('Create new category');

      // remove the 'No results found' category
      this._categoriesFiltered$.next([]);
    }
  }

  openCategoryDialog($event: KeyboardEvent, text: string) {
    $event.preventDefault();
    console.log('Open category dialog', text);

    // remove the 'No results found' category
    this._filterCategorySubject.next('');
    this.categoryInput.nativeElement.value = '';
    console.log(this.categoryInput);

    this._matDialog.open(CategoryNewComponent, {
      panelClass: 'dialog-mobile-fullscreen',
      data      : {name: text},
      autoFocus : true
    });
  }

  private _loadCategories() {
    this._benefitCategoryService.findAll(LayoutEnum.COMPACT)
      .pipe(take(1))
      .subscribe((categories) => {
        this._categories$.next(categories);
        this._categoriesFiltered$.next(categories);
      });
  }

  private _filterSubjectSub() {
    this._filterCategorySubject.pipe(
      switchMap((filterValue) =>
        this.categories$.pipe(map((categories) => filterByValue<BenefitCategory>(categories, filterValue, 'name')))
      )
    ).subscribe((filteredCategories) => {
      if (filteredCategories.length === 0) { // @ts-ignore
        filteredCategories.push({id: '', name: 'No results found. Press <Enter> to create a new category.', disabled: true});
      }

      this._categoriesFiltered$.next(filteredCategories);
    });
  }
}
