import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { PaginatedResult } from '../_models/pagination';
import { User } from '../_models/User';
import { UserParams } from '../_models/userParams';
import { AccountService } from './account.service';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class MembersService { 

  baseUrl=environment.apiUrl;
  members:Member[]=[];
  memberCache = new Map(); //it stores the value in key value pair
  user:User;
  userParams:UserParams;

  constructor(public http:HttpClient, public accountService : AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user =>
      {
        this.user=user;
        this.userParams=new UserParams(user);
      })
   }

  getUserParams()
  {
    return this.userParams;
  }

  setUserParams(params : UserParams)
  {
    this.userParams = params;
  }

  resetUserParams()
  {
    this.userParams = new UserParams(this.user);
    return this.userParams;
  }

  getMembers(userParams : UserParams)
  {
    //console.log(Object.values(userParams).join('-')); for every http action,we can able tp get a key
    var response = this.memberCache.get(Object.values(userParams).join('-'));
    if(response)
    {
      return of(response);
    }

    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params=params.append('minAge', userParams.minAge.toString());
    params=params.append('maxAge', userParams.maxAge.toString());
    params=params.append('gender', userParams.gender);
    params=params.append('orderBy', userParams.orderBy);

    //adding observe --> gets the full response not only body response.
    return getPaginatedResult<Member[]>(this.baseUrl + 'users',params,this.http)
    .pipe(map(response => {
      this.memberCache.set(Object.values(userParams).join('-'),response);
      return response;
    }));
  }

  getMember(username:string)
  {
    console.log(this.memberCache);
//https://stackoverflow.com/questions/31048953/what-does-the-three-dots-notation-do-in-javascript
//https://www.geeksforgeeks.org/javascript-spread-operator/
    const member = [...this.memberCache.values()] 
                   .reduce((arr,elem) => arr.concat(elem.result),[])
                   .find((member:Member) => member.username === username);

      if(member)
      {
        return of(member);
      }

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

  addLike(username : string)
  {
    return this.http.post(this.baseUrl + 'likes/' + username, {});
  }

  getLikes(predicate: string)
  {
    return this.http.get<Partial<Member[]>>(this.baseUrl + 'likes?predicate=' + predicate);
  }

}