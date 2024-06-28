import { Component, OnInit }                                         from '@angular/core';
import { MatDialogRef }                                              from '@angular/material/dialog';
import { TranslocoDirective, TranslocoService }                      from '@ngneat/transloco';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { NewsService }                                               from '@modules/admin/admin/news/news.service';
import { MatButtonModule }                                           from '@angular/material/button';
import { CdkTextareaAutosize }                                       from '@angular/cdk/text-field';
import { MatFormFieldModule }                                        from '@angular/material/form-field';
import { MatIcon }                                                   from '@angular/material/icon';
import { MatInputModule }                                            from '@angular/material/input';
import { MatProgressSpinner }                                        from '@angular/material/progress-spinner';
import { NgIf }                                                      from '@angular/common';
import { QuillEditorComponent }                                      from 'ngx-quill';

@Component({
  selector   : 'app-new-news',
  standalone : true,
  imports: [
    MatButtonModule,
    ReactiveFormsModule,
    CdkTextareaAutosize,
    MatFormFieldModule,
    MatInputModule,
    MatIcon,
    MatProgressSpinner,
    NgIf,
    QuillEditorComponent,
    TranslocoDirective
  ],
  templateUrl: './new-news.component.html'
})
export class NewNewsComponent implements OnInit {
  public newsForm: UntypedFormGroup;
  public title: string;
  public saveText: string;
  public quillModules: any = {
    toolbar: [
      [ 'bold', 'italic', 'underline' ],
      [ 'blockquote', 'code-block' ],
      [ {header: [ 1, 2, 3, 4, 5, 6, false ]} ],
      [ {align: []}, {list: 'ordered'}, {list: 'bullet'} ],
      [ 'clean' ],
      [ 'link', 'image' ]
    ],
  };

  constructor(
    public readonly _matDialogRef: MatDialogRef<NewNewsComponent>,
    private readonly _translateService: TranslocoService,
    private readonly _formBuilder: UntypedFormBuilder,
    private readonly _newsService: NewsService
  ) {}

  ngOnInit(): void {
    this.title = this._translateService.translate('admin.news.new.title');
    this.saveText = this._translateService.translate('admin.news.new.create');

    this.newsForm = this._formBuilder.group({
      headline: [ undefined ],
      slug    : [ undefined ],
      abstract: [ undefined ],
      body    : [ undefined ],
      category: [ undefined ],
    });
  }

  save() {

  }
}
