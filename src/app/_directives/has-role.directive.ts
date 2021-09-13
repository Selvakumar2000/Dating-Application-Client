import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { take } from 'rxjs/operators';
import { User } from '../_models/User';
import { AccountService } from '../_services/account.service';

@Directive({
  selector: '[appHasRole]'  //*appHasRole
})
export class HasRoleDirective implements OnInit{

    @Input() appHasRole: string[];
    user:User;


  //ViewContainerRef --> Represents a container where one or more views can be attached to a component.
  //TemplateRef --> Represents an embedded template that can be used to instantiate embedded views. 
  constructor(public viewContainerRef:ViewContainerRef, public templateRef:TemplateRef<any>,
              public accountService:AccountService) {
        this.accountService.currentUser$.pipe(take(1)).subscribe(user =>{
          this.user = user;
        })

  }
  ngOnInit(): void {
    //clear the view if user have no roles
    if(!this.user?.roles || this.user == null)
    {
      this.viewContainerRef.clear();
      return;
    }

    if(this.user?.roles.some(r =>this.appHasRole.includes(r)))
    {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
    else
    {
      this.viewContainerRef.clear();
    }
  }

}
