import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  listItem:any;
  totalItemCart:any;
  constructor(private router: Router, private productService: ProductServiceService, private commonService:CommonService){}
  ngOnInit(): void {
      this.get3RecentProduct();
  }
  get3RecentProduct(){
    this.productService.get3RecentProduct().subscribe((data) =>{
      this.listItem = data;
    })
  }
  detailProduct(slug:any){
    this.commonService.detailProduct(slug)
  }
  getTotalItemCarts(){
    this.totalItemCart = this.commonService.getAllCartItem();
  }
}
