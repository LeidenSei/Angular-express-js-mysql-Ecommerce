import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  listItem:any;
  totalItemCart:any;
  constructor(private router: Router, private productService: ProductService, private commonService:CommonService){}
  ngOnInit(): void {
      this.getFourNewest();
  }
  getFourNewest(){
    this.productService.getFourNewestProduct().subscribe((data) =>{
      this.listItem = data;
    })
  }
  detailProduct(slug:any){
    this.commonService.detailProduct(slug)
  }
  getTotalItemCarts(){
    this.totalItemCart = this.commonService.getAllCartItem();
  }
  addToCart(productSlug: any) {
    this.commonService.getProductBySlug(productSlug).subscribe((data) => {
      this.commonService.addToCart(data, 1);
      this.commonService.showAlerAside("Add cart successfully!", "success");
    });
  }
}
