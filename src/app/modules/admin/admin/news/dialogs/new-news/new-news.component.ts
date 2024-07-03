import { Component, OnInit }                                                     from '@angular/core';
import { MatDialogRef }                                                          from '@angular/material/dialog';
import { TranslocoDirective, TranslocoService }                                  from '@ngneat/transloco';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NewsService }                                                           from '@modules/admin/admin/news/news.service';
import { MatButtonModule }                                                       from '@angular/material/button';
import { CdkTextareaAutosize }                                                   from '@angular/cdk/text-field';
import { MatFormFieldModule }                                                    from '@angular/material/form-field';
import { MatIcon }                                                               from '@angular/material/icon';
import { MatInputModule }                                                        from '@angular/material/input';
import { MatProgressSpinner }                                                    from '@angular/material/progress-spinner';
import { JsonPipe, NgIf }                                                        from '@angular/common';
import { QuillEditorComponent }                                                  from 'ngx-quill';
import { defer }                                                                 from 'rxjs';
import { DropzoneMaterialModule }                                                from '@ngx-dropzone/material';
import { MatChipsModule }                                                        from '@angular/material/chips';
import { DropzoneCdkModule }                                                     from '@ngx-dropzone/cdk';
import { ImageUploadPreviewComponent }                                           from '@modules/admin/admin/albums/components/image-upload-preview/image-upload-preview.component';
import { MatCard }                                                               from '@angular/material/card';
import { NewsCategoriesSelectorComponent }                                       from '@modules/shared/selectors/components/news-categories-selector/news-categories-selector.component';
import { Notyf }                                                                 from 'notyf';

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
    TranslocoDirective,
    DropzoneCdkModule,
    DropzoneMaterialModule,
    MatChipsModule,
    ImageUploadPreviewComponent,
    MatCard,
    NewsCategoriesSelectorComponent,
    JsonPipe
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
    'imageCompress': {
      quality  : 0.5,
      imageType: 'image/webp',
      debug    : true
    }
  };
  private quillImageCompress$ = defer(() => import('quill-image-compress').then(module => module.default));
  public customModules = [ {implementation: this.quillImageCompress$, path: 'modules/imageCompress', property: 'imageCompress'} ];

  private readonly _notyf = new Notyf();

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
      headline     : [ undefined, [ Validators.required, Validators.minLength(10) ] ],
      abstract     : [ undefined, [ Validators.required, Validators.minLength(10) ] ],
      body         : [ undefined, [ Validators.required, Validators.minLength(50) ] ],
      category     : [ undefined, [ Validators.required ] ],
      portraitImage: [ undefined, [ Validators.required ] ],
    });
  }

  save() {
    console.log({
      ...this.newsForm.getRawValue(),
      body: JSON.parse(this.newsForm.getRawValue().body)
    });
    if (this.newsForm.invalid) {
      this._notyf.error({message: this._translateService.translate('errors.validation.message')});
      return;
    }

    this.newsForm.disable();

    this._newsService
      .post(this.newsForm.getRawValue())
      .subscribe({
        next : (result) => {
          this._matDialogRef.close();
        },
        error: (error) => {
          this._notyf.error({message: this._translateService.translate('errors.service.message')});
          this.newsForm.enable();
        }
      });
  }

  remove() {
    this.newsForm.get('portraitImage').setValue(undefined);
  }
}
