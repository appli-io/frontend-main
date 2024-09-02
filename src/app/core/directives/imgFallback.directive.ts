import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  standalone: true,
  selector  : '[imgFallback]'
})
export class ImgFallbackDirective {
  @Input() imgFallback: string;

  constructor(private el: ElementRef) {}

  @HostListener('error')
  onError() {
    this.el.nativeElement.src = this.imgFallback || 'https://via.placeholder.com/150';
  }
}
