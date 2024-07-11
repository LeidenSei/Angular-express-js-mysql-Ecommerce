import { ProfileComponent } from './../profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterViewUserComponent } from '../master-view-user/master-view-user.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { ShopComponent } from '../shop/shop.component';
import { OrderComponent } from '../cart/order.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { SuccessCheckoutComponent } from '../success-checkout/success-checkout.component';
import { ListOrderComponent } from '../list-order/list-order.component';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { AuthGuard } from 'src/app/auth.guard';
import { ContactComponent } from '../contact/contact.component';


const routes: Routes = [
  {path:'', component:MasterViewUserComponent, children:[
    {path:'', component:HomeComponent},
    {path: 'product-detail/:slug', component: ProductDetailComponent},
    {path:'login',component:LoginComponent},
    {path:'register', component:RegisterComponent},
    {path:'shop', component:ShopComponent},
    {path: 'shop/:category-name', component: ShopComponent},
    {path: 'shop/:product-name', component: ShopComponent},
    {path:'order', component:OrderComponent},
    {path:'contact', component:ContactComponent},
    {path:'checkout', component:CheckoutComponent, canActivate:[AuthGuard]},
    { 
      path: 'profile', 
      component: ProfileComponent, canActivate:[AuthGuard],
      children: [
        { path: '', component: ListOrderComponent },
        { path: 'order-detail/:order-id', component: OrderDetailComponent  }
      ]
    },
    {path:'success-checkout', component:SuccessCheckoutComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
