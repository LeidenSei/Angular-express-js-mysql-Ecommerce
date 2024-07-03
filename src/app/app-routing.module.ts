import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from './role.guard';

const routes: Routes = [
  {path: '', loadChildren:() => import('./User/user/user.module').then((m) => m.UserModule)},
  {path: 'admin', loadChildren:() => import('./Admin/admin/admin.module').then((m) => m.AdminModule ),canActivate: [RoleGuard],
    data: { expectedRole: 'admin' }
   },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
