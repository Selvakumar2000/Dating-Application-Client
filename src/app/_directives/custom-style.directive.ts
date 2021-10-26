import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appCustomStyle]'
})
export class CustomStyleDirective implements OnInit {

  //to get the element reference
  constructor(private el:ElementRef) {  }

  ngOnInit()
  {
    this.el.nativeElement.style.color = "red"; //similar to javascript concept
    //el.nativeElement.style.display = "none";  //to hide the html element
  }
}
