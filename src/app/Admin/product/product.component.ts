import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  page: number = 1;
  itemsPerPage: number = 8;
  listProduct: Product[] = [];
  totalProduct: any;
  initialListProduct: any;

  constructor(private router: Router,
      private productService: ProductService,
      private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  addProduct() {
    this.router.navigate(["admin/add-product"]);
  }

  editProduct(id: any) {
    this.router.navigate(["admin/edit-product/" + id]);
  }

  getAllProducts() {
    this.productService.getAllProduct().subscribe((data) => {
      this.listProduct = data;
      this.initialListProduct = [...data]; 
      this.sortProducts();
      this.totalProduct = data.length;
    });
  }

  deleteProduct(id: any) {
    this.productService.deleteProduct(id).subscribe((data) => {
      this.commonService.showAlerAside("Delete successfully", "success")
      this.getAllProducts();
    },
    error => {
      this.commonService.showAlerAside("Delete product failed", "error")
    });
  }

  filterByName(nameInput: HTMLInputElement) {
    let inputValue = nameInput.value.toLowerCase();
   
    if (inputValue) {
      this.listProduct = this.initialListProduct.filter((product: { name: string }) => {
        return product.name.toLowerCase().includes(inputValue);
      });
    } else {
      this.sortProducts(); 
    }
  }

  sortProducts() {
    this.listProduct.sort((a: Product, b: Product) => {
      if (a.id && b.id) {
        return b.id - a.id;
      }
      return 0;
    });
  }
  
}
