import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { OrderService } from './../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  user: any;
  cartItem: any;
  totalMoney: any;
  checkoutForm!: FormGroup;
  regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getValueToCheckout();
  }

  initializeForm() {
    this.checkoutForm = this.fb.group({
      user_id: [''],
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.pattern(this.regexPhoneNumber)]],
      address: ['', Validators.required],
      note: ['', Validators.required],
      total_money: [0],
      payment_method: ['', Validators.required],
      shipping_method: ['', Validators.required],
      avatar: [''],
      order_details: this.fb.array([])
    });
  }

  getValueToCheckout() {
    this.cartItem = this.commonService.getAllCartItem();
    this.commonService.getUserIdInToken().subscribe((data) => {
      this.user = data;
      this.checkoutForm.patchValue({
        user_id: this.user.id,
        fullname: this.user.fullname,
        email: this.user.email,
        phone_number: this.user.phone_number,
        address: this.user.address,
        total_money: this.calculateTotalMoney(this.cartItem),
        avatar: this.user.avatar
      });
  
      const orderDetailsArray = this.cartItem.map((item: { product: { id: any; price: number; }; quantity: number; }) => this.fb.group({
        product_id: item.product.id,
        price: item.product.price,
        number_of_product: item.quantity,
        total_money: item.product.price * item.quantity
      }));
      
      this.checkoutForm.setControl('order_details', this.fb.array(orderDetailsArray));
      console.log(this.checkoutForm.value);
      
    });
  }
  

  calculateTotalMoney(cartItems: any[]): number {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  onSubmit() {
    const paymentMethod = this.checkoutForm.get('payment_method');
    const shippingMethod = this.checkoutForm.get('shipping_method');
    const note = this.checkoutForm.get('note');
  
    
    if (paymentMethod?.invalid || shippingMethod?.invalid || note?.invalid) {
      return;
    }
    if (this.user.is_active == 0) {
      this.commonService.showAlert("Your account has been disabled", "error");
      return;
    }
  
    this.orderService.postCheckout(this.checkoutForm.value).subscribe(
      response => {
        this.commonService.removeAllCartItem();
        this.router.navigate(['/success-checkout']);
      },
      error => {
        this.commonService.showAlert("Checkout failed", "error");
      }
    );
  }
}
