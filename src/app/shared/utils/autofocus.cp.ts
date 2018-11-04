import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[pc-autofocus]'
})
export class AutofocusDirective implements OnInit {

  constructor(private elementRef: ElementRef) { };

  ngOnInit(): void {
    this.elementRef.nativeElement.focus();
  }
}
