import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl=environment.apiUrl;
  members:Member[]=[];
  constructor(public http:HttpClient) { }

  getMembers()
  {
    if(this.members.length>0) return of(this.members); //returns observable
    //our api methods are authorized,we need to send the token aswell
    return this.http.get<Member[]>(this.baseUrl+'users').pipe(          //get<> provide typesafety
      map(members=>
        {
          this.members=members;
          return members; //returns observable
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
