import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class MembersService { 

  baseUrl=environment.apiUrl;
  members:Member[]=[];
  paginatedResult:PaginatedResult<Member[]>=new PaginatedResult<Member[]>();

  constructor(public http:HttpClient) { }

  getMembers(page?:number,itemsPerPage?:number)
  {
    //have the ability to(serialize parameters) add parameters into our query string
    let params=new HttpParams(); 

    if(page!==null && itemsPerPage!==null)
    {
      params=params.append('pageNumber',page.toString());
      params=params.append('pageSize',itemsPerPage.toString());
    }


    //our api methods are authorized,we need to send the token aswell
    //adding observe --> gets the full response not only body response.
    return this.http.get<Member[]>(this.baseUrl+'users',{observe:'response',params}).pipe(   //get<> provide typesafety
     map(
       response=>
      {
        this.paginatedResult.result=response.body;
        if(response.headers.get('Pagination') !==null)
        {
          this.paginatedResult.pagination=JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;
      })
    );
  }

  getMember(username:string)
  {
    const member=this.members.find(x=>x.username===username);
    if(member!==undefined) return of(member);
    //our api methods are authorized,we need to send the token aswell
    return this.http.get<Member>(this.baseUrl+'users/'+username); 
  }

  updateMember(member:Member)
  {
    return this.http.put(this.baseUrl+'users',member).pipe(
      map(()=>
      {
        const index=this.members.indexOf(member);
        this.members[index]=member;
      })
    );
  }

  setMainPhoto(photoId:number)
  {
    return this.http.put(this.baseUrl+'users/set-main-photo/'+photoId,{});
  }
  
  deletePhoto(photoId:number)
  {
    return this.http.delete(this.baseUrl+'users/delete-photo/'+photoId);
  }
}