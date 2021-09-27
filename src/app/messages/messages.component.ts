import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message} from '../_models/message';
import { Pagination } from '../_models/pagination';
import { AccountService } from '../_services/account.service';
import { ConfirmService } from '../_services/confirm.service';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./message.component.css']
})
export class MessagesComponent implements OnInit {

  messages : Message[];
  pagination : Pagination;
  container = 'Unread';
  pageNumber = 1;
  pageSize = 5;
  loading = false;
  
  constructor(public messageService:MessageService, public confirmService: ConfirmService,
             public accountService:AccountService,public router:Router) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages()
  {
    this.loading = true;
    this.messageService.getMessages(this.pageNumber,this.pageSize,this.container).subscribe(
      response =>
      {
        this.messages = response.result;
        this.pagination = response.pagination;
        this.loading = false;
      }
    );
   
  }

  deleteMessage(id:number)
  {
    this.confirmService.confirm('Confirm delete message', 'This cannot  be undone').subscribe(result => {
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
