import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightColor]'
})
export class HighlightColorDirective {

  @Input() defaultColor:string = 'red';
  @Input() highlightColor:string = 'yellow';

  //similar to renderer2 but have minimum code
  @HostBinding('style.background-color') color:string;

  constructor(private el:ElementRef, public renderer:Renderer2) { }

  //use special methods which inside the Renderer2 to change the behaviour of html
  ngOnInit()
  {
    this.color=this.defaultColor;
  }

  @HostListener('mouseenter') onmousEover(event: Event) {
    this.color=this.highlightColor;
  }

  @HostListener('mouseleave') onmouseLeave(event: Event) {
    this.color=this.defaultColor;
  }

  @HostListener('click') onClick(event: Event) {
    this.color='pink'
  }


}
