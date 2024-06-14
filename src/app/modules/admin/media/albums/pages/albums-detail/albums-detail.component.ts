import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { TranslocoDirective }                                                                      from '@ngneat/transloco';
import { IAlbum }                                                                                  from '@modules/admin/media/albums/interfaces/album.interface';
import { ActivatedRoute, RouterLink }                                                              from '@angular/router';
import { MatIcon }                                                                                 from '@angular/material/icon';
import { MatDivider }                                                                              from '@angular/material/divider';
import { MatButton }                                                                               from '@angular/material/button';
import { MatTooltip }                                                                              from '@angular/material/tooltip';
import { DatePipe }                                                                                from '@angular/common';
import { FuseMasonryComponent }                                                                    from '@fuse/components/masonry';
import { trackByFn }                                                                               from '@libs/ui/utils/utils';
import { AlbumCardComponent }                                                                      from '@modules/admin/media/albums/components/album-card/album-card.component';
import { ImgLoaderDirective }                                                                      from '@layout/directives/img-loader.directive';
import { IAlbumImage }                                                                             from '@modules/admin/media/albums/interfaces/album-image.interface';
import { LightgalleryModule }                                                                      from 'lightgallery/angular';
import { LightGallery }                                                                            from 'lightgallery/lightgallery';
import lightGallery                                                                                from 'lightgallery';
import lgZoom                                                                                      from 'lightgallery/plugins/zoom';
import lgAutoplay                                                                                  from 'lightgallery/plugins/autoplay';
import { FuseMediaWatcherService }                                                                 from '@fuse/services/media-watcher';
import { takeUntilDestroyed }                                                                      from '@angular/core/rxjs-interop';

@Component({
  selector       : 'app-albums-detail',
  standalone     : true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports        : [
    TranslocoDirective,
    RouterLink,
    MatIcon,
    MatDivider,
    MatButton,
    MatTooltip,
    DatePipe,
    FuseMasonryComponent,
    AlbumCardComponent,
    ImgLoaderDirective,
    LightgalleryModule
  ],
  templateUrl    : './albums-detail.component.html'
})
export class AlbumsDetailComponent implements AfterViewInit {
  @ViewChild('lightGallery') lightGallery: { _elementRef: { nativeElement: any } };
  inlineGallery: LightGallery;
  public readonly route = inject(ActivatedRoute);
  public readonly album: IAlbum = this.route.snapshot.data.album;
  public columns = 4;
  public settings = {};

  protected readonly trackByFn = trackByFn;

  constructor(
    private readonly _cdr: ChangeDetectorRef,
    private readonly _fuseMediaWatcherService: FuseMediaWatcherService
  ) {
    this._fuseMediaWatcherService.onMediaChange$
      .pipe(takeUntilDestroyed())
      .subscribe(({matchingAliases}) => {
        console.log(matchingAliases, this.columns);

        // Set the masonry columns
        //
        // This if block structured in a way so that only the
        // biggest matching alias will be used to set the column
        // count.
        if (matchingAliases.includes('xl')) {
          if (this.columns !== 4) {
            this.columns = 4;
            this._cdr.detectChanges();
          }
        } else if (matchingAliases.includes('lg')) {
          if (this.columns !== 4) {
            this.columns = 4;
            this._cdr.detectChanges();
          }
        } else if (matchingAliases.includes('md')) {
          if (this.columns !== 3) {
            this.columns = 3;
            this._cdr.detectChanges();
          }
        } else if (matchingAliases.includes('sm')) {
          if (this.columns !== 2) {
            this.columns = 2;
            this._cdr.detectChanges();
          }
        } else {
          if (this.columns !== 1) {
            this.columns = 1;
            this._cdr.detectChanges();
          }
        }
      });
  }

  ngAfterViewInit() {
    const lgContainer = this.lightGallery._elementRef.nativeElement;

    const items = [];

    if (this.album.cover)
      items.push({
        src     : this.album.cover.fileUrl,
        thumb   : this.album.cover.fileUrl,
        download: this.album.cover.name,
        subHtml : `<div class="lightGallery-captions">
                <h4>${ this.album.cover.name }</h4>
            </div>`
      });

    if (this.album.images?.length > 0)
      items.push(
        ...this.album.images?.map((image) => ({
          src     : image.original.fileUrl,
          thumb   : image.original.fileUrl,
          download: image.original.name,
          subHtml : `<div class="lightGallery-captions">
                <h4>${ image.original.name }</h4>
            </div>`
        }))
      );

    this.inlineGallery = lightGallery(lgContainer, {
      loop      : true,
      actualSize: true,
      dynamic   : true,
      // Turn off hash plugin in case if you are using it
      // as we don't want to change the url on slide change
      hash: false,
      // Do not allow users to close the gallery
      closable        : true,
      appendSubHtmlTo : '.lg-item',
      dynamicEl       : [ ...items ],
      autoplayControls: true,
      plugins         : [ lgZoom, lgAutoplay ]
    });
  }

  public selectedImage(image: IAlbumImage) {
    const index = this.album.images.indexOf(image);

    if (index === -1)
      this.openGallery(0);
    else
      this.openGallery(index + 1);
  }

  private openGallery(index) {
    this.inlineGallery.openGallery(index);
  }
}
