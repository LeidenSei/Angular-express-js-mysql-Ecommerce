import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './User/header/header.component';
import { FooterComponent } from './User/footer/footer.component';
import { ShopComponent } from './User/shop/shop.component';
import { NaviBarComponent } from './User/navi-bar/navi-bar.component';
import { OrderComponent } from './User/order/order.component';
import { ProductDetailComponent } from './User/product-detail/product-detail.component';
import { CheckoutComponent } from './User/checkout/checkout.component';
import { LoginComponent } from './User/login/login.component';
import { RegisterComponent } from './User/register/register.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { CategoryComponent } from './Admin/category/category.component';
import { ProductComponent } from './Admin/product/product.component';
import { AddProductComponent } from './Admin/product/add-product/add-product.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterViewUserComponent } from './User/master-view-user/master-view-user.component';
import { MasterViewAdminComponent } from './Admin/master-view-admin/master-view-admin.component';
import { HomeComponent } from './User/home/home.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfileComponent } from './User/profile/profile.component';
import { SuccessCheckoutComponent } from './User/success-checkout/success-checkout.component';
import { OrderDetailComponent } from './User/order-detail/order-detail.component';
import { ListOrderComponent } from './User/list-order/list-order.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrdersComponent } from './Admin/orders/orders.component';
import { OrderDetailsComponent } from './Admin/order-details/order-details.component';
import { UsersComponent } from './Admin/users/users.component';
import { UserDetailComponent } from './Admin/user-detail/user-detail.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { AdminProfileComponent } from './Admin/admin-profile/admin-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ShopComponent,
    NaviBarComponent,
    OrderComponent,
    ProductDetailComponent,
    CheckoutComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    CategoryComponent,
    ProductComponent,
    AddProductComponent,
    MasterViewUserComponent,
    MasterViewAdminComponent,
    HomeComponent,
    ProfileComponent,
    SuccessCheckoutComponent,
    OrderDetailComponent,
    ListOrderComponent,
    OrdersComponent,
    OrderDetailsComponent,
    UsersComponent,
    UserDetailComponent,
    AdminProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CKEditorModule,
    NgxPaginationModule,
    FormsModule,
    NgbModule,
    NgxSliderModule,
    BrowserAnimationsModule
  ],
  providers: [

  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
