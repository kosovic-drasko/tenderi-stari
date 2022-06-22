import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[jhiHideMe]',
  exportAs: 'jhiHideMe',
})
export class HideMeDirective implements AfterViewInit {
  hide: boolean | undefined;

  constructor(private el: ElementRef, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): any {
    this.hide = false;
    this.cdr.detectChanges();
  }
}
