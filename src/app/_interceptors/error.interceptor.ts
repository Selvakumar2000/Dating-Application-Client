import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(public router:Router,public toastr:ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error=> {
        if(error)
        {
          switch (error.status) {
            case 400:
              if(error.error.errors)
              {
                const modalStateErrors=[];
                for(const key in error.error.errors)
                {
                  if(error.error.errors[key])
                  {
                    modalStateErrors.push(error.error.errors[key]);
                  }
                }
                //throw modalStateErrors; //why? to display the errors in a list manner below the form
//modalStateErrors -->it is an array of array,so we need to flatten this for easy iterating  
                throw modalStateErrors.flat(); //available in es2019
              }
              else if(typeof(error.error) === 'object')
              {
                const validationError=[];
                for (let code of Object.keys(error.error))
                { 
                  if(error.error[code])
                  {
                    var desc = error.error[code];
                    validationError.push(desc.description);
                  }
                }
                throw validationError.flat();
              }
              else
              {
                this.toastr.error(error.error);
              }
              break;

            case 401:
              this.toastr.error(error.error);
              break;
            
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            
            case 500: //redirect them to server error page or return detail error msg returned from our API
              const navigationExtras:NavigationExtras={state:{error:error.error}};
              //navigationExtras --> holds the error,untill the user refresh the page
              this.router.navigateByUrl('/server-error',navigationExtras);
              break;

            default:
              this.toastr.error('Something went wrong! Please relaunch the application!!!');
              console.log(error);
              break;
          }
        }
        return throwError(error);
      })
    );
  }
}