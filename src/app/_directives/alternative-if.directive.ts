import { Directive, Input, OnChanges, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appAlternativeIf]'
})
export class AlternativeIfDirective implements OnChanges /*implements OnInit*/{
 //from the directive name only we can get the input
  @Input() appAlternativeIf:boolean; 

  constructor(private template:TemplateRef<any>, private vcRef:ViewContainerRef) { }
/*
it will executed only once, whenever the directive is initialised
here the directive is initialised in the view and ngOnInit executed, after that
Input property is changed, but the view not performing correct.so we need to
use ngOnChanges() here, it reinitialised whenever the input property is changed.
*/
  // ngOnInit()
  // {
  //   if(this.appAlternativeIf)
  //   {
  //     this.vcRef.createEmbeddedView(this.template);
  //   }
  //   else
  //   {
  //     this.vcRef.clear();
  //   }
  // }

  //it fired whenever the input data is changed
  ngOnChanges()
  {
    if(this.appAlternativeIf)
    {
      this.vcRef.createEmbeddedView(this.template);
    }
    else
    {
      this.vcRef.clear();
    }
  }
}
