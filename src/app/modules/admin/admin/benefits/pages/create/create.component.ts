import { AsyncPipe, NgForOf }                                                from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup }         from '@angular/forms';
import { MatAutocompleteModule }                                             from '@angular/material/autocomplete';
import { MatIconButton }                                                     from '@angular/material/button';
import { MatDialog }                                                         from '@angular/material/dialog';
import { MatDivider }                                                        from '@angular/material/divider';
import { MatFormFieldModule }                                                from '@angular/material/form-field';
import { MatIcon }                                                           from '@angular/material/icon';
import { MatInput }                                                          from '@angular/material/input';

import { TranslocoDirective, TranslocoPipe }              from '@ngneat/transloco';
import { BehaviorSubject, map, Subject, switchMap, take } from 'rxjs';

import { LayoutEnum }                   from '@core/enums/layout.enum';
import { displayWithFn, filterByValue } from '@core/utils';
import { CategoryNewComponent }         from '@modules/admin/admin/benefits/dialogs/category-new/category-new.component';
import { BenefitCategory }              from '@modules/admin/admin/benefits/models/benefit-category';
import { BenefitCompany }               from '@modules/admin/admin/benefits/models/benefit-company';
import { BenefitsService }              from '@modules/admin/admin/benefits/services/benefits.service';
import { BenefitCategoryService }       from '@modules/admin/admin/benefits/services/benefit-category.service';
import { BenefitCompanyService }        from '@modules/admin/admin/benefits/services/benefit-company.service';
import { PageDetailHeaderComponent }    from '@modules/shared/components/page-detail-header/page-detail-header.component';
import { SIMPLE_QUILL_EDITOR_MODULES }  from '@core/constants';
import { QuillEditorComponent }         from 'ngx-quill';

@Component({
  selector       : 'app-create',
  standalone     : true,
  imports: [
    MatIcon,
    MatIconButton,
    TranslocoDirective,
    PageDetailHeaderComponent,
    TranslocoPipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInput,
    NgForOf,
    MatDivider,
    AsyncPipe,
    QuillEditorComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl    : './create.component.html'
})
export class CreateComponent implements OnInit {
  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;
  @ViewChild('companyInput') companyInput: ElementRef<HTMLInputElement>;

  public form: UntypedFormGroup;
  public readonly quillModules: any = SIMPLE_QUILL_EDITOR_MODULES;
  private _categories$: BehaviorSubject<BenefitCategory[]> = new BehaviorSubject<BenefitCategory[]>([]);
  private _categoriesFiltered$: BehaviorSubject<BenefitCategory[]> = new BehaviorSubject<BenefitCategory[]>([]);
  private _filterCategorySubject: Subject<string> = new Subject<string>();
  private _companies$: BehaviorSubject<BenefitCompany[]> = new BehaviorSubject<BenefitCompany[]>([]);
  private _companiesFiltered$: BehaviorSubject<BenefitCompany[]> = new BehaviorSubject<BenefitCompany[]>([]);
  private _filterCompanySubject: Subject<string> = new Subject<string>();
  protected readonly displayCategoryWithFn = displayWithFn<BenefitCategory>;
  protected readonly displayCompanyWithFn = displayWithFn<BenefitCompany>;

  constructor(
    private readonly _benefitsService: BenefitsService,
    private readonly _benefitCategoryService: BenefitCategoryService,
    private readonly _benefitsCompanyService: BenefitCompanyService,
    private readonly _matDialog: MatDialog,
    private readonly _formBuilder: UntypedFormBuilder
  ) {
    this._loadForm();
  }

  get categories$() {
    return this._categories$.asObservable();
  }

  get categoriesFiltered$() {
    return this._categoriesFiltered$.asObservable();
  }

  get companies$() {
    return this._companies$.asObservable();
  }

  get companiesFiltered$() {
    return this._companiesFiltered$.asObservable();
  }

  ngOnInit() {
    this._loadCategories();
    this._loadCompanies();

    this._filterCategorySubjectSub();
    this._filterCompanySubjectSub();
  }

  filter(field: 'category' | 'company', target: any) {
    console.log(field, target);
    switch (field) {
      case 'category': {
        this._filterCategorySubject.next(target.value);
        break;
      }
      case 'company': {
        this._filterCompanySubject.next(target.value);
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

  onCompanySelect(company: BenefitCompany) {
    console.log(company);

    if (company.id === '') {
      console.log('Create new company');

      // remove the 'No results found' company
      this._companiesFiltered$.next([]);
    }
  }

  openCategoryDialog($event: KeyboardEvent | MouseEvent, text: string) {
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

  private _loadCompanies() {
    this._benefitsCompanyService.findAll(LayoutEnum.COMPACT)
      .pipe(take(1))
      .subscribe((companies) => {
        this._companies$.next(companies);
        this._companiesFiltered$.next(companies);
      });
  }

  private _filterCategorySubjectSub() {
    this._filterCategorySubject.pipe(
      switchMap((filterValue) =>
        this.categories$.pipe(map((categories) => filterByValue<BenefitCategory>(categories, filterValue, 'name')))
      )
    ).subscribe((filteredCategories) => {
      if (filteredCategories.length === 0) // @ts-ignore
        filteredCategories.push({id: '', name: 'Press <Enter> to create a new category.', disabled: true});

      this._categoriesFiltered$.next(filteredCategories);
    });
  }

  private _filterCompanySubjectSub() {
    this._filterCompanySubject.pipe(
      switchMap((filterValue) =>
        this.companies$.pipe(map((companies) => filterByValue<BenefitCompany>(companies, filterValue, 'name')))
      )
    ).subscribe((filteredCompanies) => {
      this._companiesFiltered$.next(filteredCompanies);
    });
  }

  private _loadForm() {
    this.form = this._formBuilder.group({
      type        : [ '' ],
      category    : [ '' ],
      company     : [ '' ],
      name        : [ '' ],
      description : [ '' ],
      requirements: [ '' ],
      conditions  : [ '' ],
      dueDate     : [ '' ],
      image       : [ '' ],

    });
  }
}
