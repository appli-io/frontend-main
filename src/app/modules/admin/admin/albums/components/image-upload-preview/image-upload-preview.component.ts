import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconButton }                                  from '@angular/material/button';
import { MatProgressSpinner }                             from '@angular/material/progress-spinner';
import { MatProgressBar }                                 from '@angular/material/progress-bar';
import { MatIcon }                                        from '@angular/material/icon';
import { fuseAnimations }                                 from '@fuse/animations';
import { MatCard }                                        from '@angular/material/card';

@Component({
  selector   : 'image-upload-preview',
  standalone : true,
  imports: [
    MatIconButton,
    MatProgressSpinner,
    MatProgressBar,
    MatIcon,
    MatCard
  ],
  templateUrl: './image-upload-preview.component.html',
  animations : fuseAnimations,
})
export class ImageUploadPreviewComponent implements OnInit {
  @Input() file!: File;
  @Input() enableUpload = false;
  @Output() remove = new EventEmitter<File>();
  @Output() upload = new EventEmitter<File>();

  imageSrc!: string;
  uploadProgress: number = 0;
  isUploading = false;
  isUploaded = false;

  ngOnInit() {
    this.imageSrc = URL.createObjectURL(this.file);
  }

  removeImage() {
    this.remove.emit(this.file);
  }

  uploadImage() {
    this.isUploading = true;
    this.upload.emit(this.file);
  }

  setUploadProgress(progress: number) {
    this.uploadProgress = progress;
    if (progress === 100) {
      this.isUploading = false;
      this.isUploaded = true;
    }
  }
}
