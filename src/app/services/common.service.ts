import { AuthService } from './auth.service';
import { RatingServiceService } from './rating-service.service';
import { OrderService } from './order.service';
import { ShopService } from './shop.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ProductServiceService } from './product-service.service';
import { CategoryService } from './category.service';
import { Observable } from 'rxjs';
import { CartService } from './cart.service';
import { UserService } from './user.service';
import { tap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  product: any;
  listCate: any;
  categoryId: any;
  user: any;
  listOrder:any;
  data:any;
  constructor(
    private router: Router,
    private productService: ProductServiceService,
    private categoryService: CategoryService,
    private cartService: CartService,
    private shopService: ShopService,
    private userService: UserService,
    private orderService: OrderService,
    private ratingServiceService:RatingServiceService,
    private authService:AuthService
  ) {}

  detailProduct(slug: string) {
    this.router.navigate(['product-detail', slug]);
  }
  getProductBySlug(slug: string): Observable<any> {
    return this.productService.getProductBySlug(slug);
  }
  addToCart(product: any, quantity: any) {
    this.cartService.addToCart(product, quantity);
  }
  getCartItemById(productId: any) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    return cartItems.find(
      (item: { product: { id: any } }) => item.product.id === productId
    );
  }
  removeCartItemById(id: any) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const updatedCartItems = cartItems.filter(
      (item: { product: { id: any } }) => item.product.id !== id
    );
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  }
  calculateTotalMoney(cartItems: any[]): any {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }
  getAllCartItem() {
    return this.cartService.getCartItems();
  }
  removeAllCartItem(){
    localStorage.removeItem("cartItems");
  }
  findCategoryIdByName(categoryName: string, listCate: any) {
    const category = listCate.find(
      (cate: { name: string }) => cate.name === categoryName
    );
    if (category) {
      return category.id;
    } else {
      console.log('Category not found');
      return null;
    }
  }
  getUserIdInToken(): Observable<any> {
    let userId = this.authService.getUserId();
    return this.userService.getUserById(userId);
  }
  
  //local
  addRecentProduct(product: any) {
    const maxRecentProducts = 3;
  
    let recentProducts = JSON.parse(localStorage.getItem('recentProducts') || '[]');
  
    const exists = recentProducts.some((p: any) => this.productsAreEqual(p, product));
  
    if (exists) {
      return; 
    }
  
    recentProducts.push(product);
  
    if (recentProducts.length > maxRecentProducts) {
      recentProducts = recentProducts.slice(recentProducts.length - maxRecentProducts);
    }
  
    localStorage.setItem('recentProducts', JSON.stringify(recentProducts));
  } 

  
  productsAreEqual(product1: any, product2: any): boolean {

    return product1.id === product2.id;
  }
  
  
  getRecentProduct():any{
    const recentProducts = localStorage.getItem('recentProducts');
    if(recentProducts){
      return JSON.parse(recentProducts)
    }
    return null
  }

  removeUserFromLocal(): void {
    localStorage.removeItem('user');
  }

  getUserById(id: any): Observable<any> {
    return this.userService.getUserById(id).pipe(
      tap((data) => {
        this.removeUserFromLocal();
      })
    );
  }
  getAvgRatingProduct(id:any){
    this.ratingServiceService.getAllRatingProductById(id).subscribe((data)=>{
      this.data = data
      return this.data;
    })
  }  

  //alert
  showAlert(text:any, icon:any) {
    Swal.fire({
      title: 'SweetAlert!',
      text: text,
      icon: icon,
      confirmButtonText: 'Cool'
    });
  }
  confirmAlert(){
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }
  showAlerAside(text:any, icon:any){
    Swal.fire({
      position: "top-end",
      icon: icon,
      title: text,
      showConfirmButton: false,
      timer: 1500
    });
  }
  //formateDate
  formatDate(date: string | Date): string {
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }

  //check duplicate
checkDuplicate(name: any, list:any): boolean {
  return list.some((item: any) => item.name == name);
}
}
