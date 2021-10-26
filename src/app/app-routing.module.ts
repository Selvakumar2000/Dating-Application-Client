import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { CategoriesComponent } from './categories/categories.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { AdminGuard } from './guards/admin.guard';
import { AngularGuardGuard } from './guards/angular-guard.guard';
import { AuthGuard } from './guards/auth.guard';
import { DeactivateGuardGuard } from './guards/deactivate-guard.guard';
import { PreventUnsavedChangesGuard } from './guards/prevent-unsaved-changes.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { UserComponent } from './user/user.component';
import { UsersComponent } from './users/users.component';
import { MemberDetailedResolver } from './_resolvers/member-detailed.resolver';
import { UserresolverResolver } from './_resolvers/userresolver.resolver';


const routes: Routes = [
 
  {path: '', component: HomePageComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'members', component: MemberListComponent},
      {path: 'members/:username', component: MemberDetailComponent, resolve: {member: MemberDetailedResolver}},
      {path: 'member/edit', component: MemberEditComponent, canDeactivate: [PreventUnsavedChangesGuard]},
      {path: 'lists', component: ListsComponent},
      {path: 'messages', component: MessagesComponent},
      {path: 'admin', component: AdminPanelComponent, canActivate: [AdminGuard]},
    ]
  },

  //angular routing 
  {path:'home', component:HomeComponent},
  {
    path:'users',
    component:UsersComponent, 
    //allows upto this route if user not login: https://localhost:4200/
    //canActivate:[AngularGuardGuard],  

    //allows upto this route if user not login: https://localhost:4200/users/
    canActivateChild:[AngularGuardGuard],

/*if I wish to allow parent route but not allow the child route, remove 
canActivate:[AngularGuardGuard] from parent and place this to all child routes or use
canActivateChild.It will only work for the child routes not for parent routes.
 **Respective methods should be defined in the guard.
*/
    //parent component loaded inside this child component gets loaded
    //children route can also have a children route
    children: [
      {path:':id/:name',component:UserComponent},
      {path:':id/:name/edit',component:EditUserComponent,
                             canDeactivate:[DeactivateGuardGuard],
                             resolve:{user : UserresolverResolver}
/*user stores the data which comes from the UserresolverResolver and this user
property will sent to the editUser component*/     
      },
    ],
  },
  //{path:'users/:id/:name', component:UserComponent}, use this as child route

/*
canDeactive executes when leaving from current root to another root, in otherwords
canDeactivate will be executed before going to another route
widely used in editing a data

*/
  //{path:'categories/something/id', component:CategoriesComponent},
  //send static data to the route
  {path:'categories', component:CategoriesComponent, data: {page:1, name:'selva'}},
  //adding parameter dynamically into the url
  {path:'categories/:id', component:CategoriesComponent}, 
  
  {path: 'errors', component: TestErrorsComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  //any path other than above path 
  {path: '**', redirectTo:'not-found'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }