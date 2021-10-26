import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRendererHighlight]'
})
export class RendererHighlightDirective implements OnInit {

  //similar to renderer2 but have minimum code
  @HostBinding('style.background-color') color:string;

  constructor(private el:ElementRef, public renderer:Renderer2) { }

  //use special methods which inside the Renderer2 to change the behaviour of html
  ngOnInit()
  {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', 'orange');
  }

  @HostListener('mouseenter') onmousEover(event: Event) {
    //this.renderer.setStyle(this.el.nativeElement, 'background-color', 'pink');
    this.color='pink';
  }

  @HostListener('mouseleave') onmouseLeave(event: Event) {
    //this.renderer.setStyle(this.el.nativeElement, 'background-color', 'yellow');
    this.color='yellow';
  }

  @HostListener('click') onClick(event: Event) {
    //this.renderer.setStyle(this.el.nativeElement, 'background-color', 'blue');
    this.color='blue';
  }

}
