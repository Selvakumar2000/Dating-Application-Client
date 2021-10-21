import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message} from '../_models/message';
import { Pagination } from '../_models/pagination';
import { AccountService } from '../_services/account.service';
import { ConfirmService } from '../_services/confirm.service';
import { MessageService } from '../_services/message.service';
import { PresenceService } from '../_services/presence.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./message.component.css']
})
export class MessagesComponent implements OnInit {

  messages : Message[];
  pagination : Pagination;
  container = 'Inbox';
  loading = false;
  constructor(public messageService:MessageService, public confirmService: ConfirmService,
             public accountService:AccountService,public router:Router,public presenceService:PresenceService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages()
  {
    this.loading = true;
    this.messageService.getMessages(this.container).subscribe(
      response =>
      {
        this.messages = response;
        this.loading = false;
      }
    );
   
  }

  deleteMessage(id:number)
  {
    this.confirmService.confirm('Confirm delete message', 'This message can not be retrieved')
    .subscribe(result => {
      if(result)
      {
        this.messageService.deleteMessage(id).subscribe(() => {
          this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
        });
      }
    });
  }
  
  logout()
  {
    this.accountService.logout();
    this.router.navigateByUrl('/'); 
  }
}
