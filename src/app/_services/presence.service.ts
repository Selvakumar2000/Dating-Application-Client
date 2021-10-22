import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {

  hubUrl = environment.hubUrl;
  private hubConnection: HubConnection;
  private onlineUsersSource = new BehaviorSubject<string[]>([]);
  onlineUsers$ = this.onlineUsersSource.asObservable();


  constructor(private toastr: ToastrService) { }

/*
1.method to create the hub connection, so that when a user does connect to our application and they are
authenticated, then we are create hub connection that's going to connect them to our presence hub.
2.Pass user as a parameter, because we need to send up our user token(JWT token) when we make this connection
we cannot use our jwt interceptor here, because it is no longer be a http request.These are using,
websockets which has no support for an authentication header.
3.Call the method when the user login or register 
*/
  createHubConnection(user: User) 
  {
    this.hubConnection = new HubConnectionBuilder()
    .withUrl(this.hubUrl + 'presence', {
      accessTokenFactory: () => user.token
    }) //map with presencehub in api
//if there is an network problem, client is automatically going to try and reconect to our hub.
    .withAutomaticReconnect() 
    .build()

    //start the hub connection
    this.hubConnection
        .start()
        .catch(error => console.log(error));

    

    this.hubConnection.on('UserIsOnline', username => {
      this.onlineUsers$.pipe(take(1)).subscribe(usernames => {
      this.onlineUsersSource.next([...usernames, username])
      })
    })

    this.hubConnection.on('UserIsOffline', username => {
      this.onlineUsers$.pipe(take(1)).subscribe(usernames => {
        this.onlineUsersSource.next([...usernames.filter(x => x !== username)])
      })
    })

    this.hubConnection.on('GetOnlineUsers', (usernames:string[]) => {
      this.onlineUsersSource.next(usernames);
    })

    this.hubConnection.on('NewMessageReceived', ({username, knownAs})  => {
      // this.toastr.info('You have received a new message!')
      // .onTap
      // .pipe(take(1))
      // .subscribe(() => this.router.navigateByUrl('/messages'));
    })

  }
/*
when the user logout the signalR disconnected the client and stop the hub connection.
user close the browser and moves to another website, the signalR automatically disconnected the client
*/
  stopHubConnection()
  {
    this.hubConnection.stop().catch(error => console.log(error));
  }

}