import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Injectable({
  providedIn: 'root'
})
export class DeactivateGuardGuard implements CanDeactivate<unknown> {

  canDeactivate(component: EditUserComponent):Observable<boolean> | boolean {

    if(component.editForm.dirty)
    {
      return confirm('Are you sure, you want to exit!!!');
    }

    return true;
  }
  
}
