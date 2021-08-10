import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DisplayuserComponent } from './displayuser/displayuser.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { SubjectComponent } from './subject/subject.component';
import { BehaviourSubjectComponent } from './behaviour-subject/behaviour-subject.component';
import { ReplaySubjectComponent } from './replay-subject/replay-subject.component';
import { AyncSubjectComponent } from './aync-subject/aync-subject.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { SharedModule } from './_modules/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    DisplayuserComponent,
    NavComponent,
    SubjectComponent,
    BehaviourSubjectComponent,
    ReplaySubjectComponent,
    AyncSubjectComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberDetailComponent,
    MessagesComponent,
    ListsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
