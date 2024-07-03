import { CommonService } from 'src/app/services/common.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductServiceService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  p: number = 1;
  itemsPerPage: number = 8;
  listProduct: any;
  totalProduct: any;
  initialListProduct: any; // Biến để lưu trữ danh sách ban đầu

  constructor(private router: Router,
      private productService: ProductServiceService,
      private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  addProduct() {
    this.router.navigate(["admin/add-product"]);
  }

  editProduct(id: any) {
    this.router.navigate(["admin/edit-product/" + id]);
  }

  getAll() {
    this.productService.getAll().subscribe((data) => {
      this.listProduct = data;
      this.initialListProduct = [...data]; // Sao chép danh sách ban đầu
      this.sortProducts(); // Sắp xếp danh sách ban đầu
      this.totalProduct = data.length;
    });
  }

  deleteProduct(id: any) {
    this.productService.delete(id).subscribe((data) => {
      this.commonService.showAlerAside("Delete successfully", "success")
      this.getAll();
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
    this.listProduct.sort((a: { id: any; }, b: { id: any; }) => b.id - a.id);
  }
}
