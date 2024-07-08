import { CategoryComponent } from './../category/category.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterViewAdminComponent } from '../master-view-admin/master-view-admin.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ProductComponent } from '../product/product.component';
import { AddProductComponent } from '../product/add-product/add-product.component';
import { EditProductComponent } from '../product/edit-product/edit-product.component';
import { OrdersComponent } from '../orders/orders.component';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { UsersComponent } from '../users/users.component';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { ContactComponent } from '../contact/contact.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: '', component:MasterViewAdminComponent },
    { path: 'product', component:ProductComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'list-message', component: ContactComponent },
    { path: 'users', component: UsersComponent },
    { path: 'user-detail/:id', component: UserDetailComponent },
    { path: 'add-product', component: AddProductComponent },
    { path: 'edit-product/:id', component: EditProductComponent },
    { path: 'order-detail/:id', component: OrderDetailsComponent }
  ]},
  { path: '**', redirectTo: '' }
];;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {

 }
