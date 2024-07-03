import { CommonService } from './../../services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from './../../services/shop.service';
import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  listProduct: any;
  listCate: any;
  p: number = 1;
  itemsPerPage: number = 6;
  categoryName: any = '';
  categoryId: any;
  title: any;
  productName: any;
  itemcart: any;
  recentProducts: any;
  OriginalProduct: any;

  constructor(
    private shopService: ShopService, 
    private route: ActivatedRoute,
    private commonService: CommonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadInitialData();
  }

  async loadInitialData() {
    await this.getAllCategory();
    console.log(this.value, this.highValue);
    
    this.route.paramMap.subscribe(async params => {
      if (params.has('category-name')) {
        this.categoryName = params.get('category-name');
        await this.getProductByCategoryName(this.categoryName);
      } else {
        await this.getAllProduct();
      }
      this.OriginalProduct = this.listProduct;
    });
    this.filterByPriceRange();
    this.recentProducts = this.commonService.getRecentProduct();
  }


  async getAllProduct() {
    try {
      const data = await this.shopService.getAllProduct().toPromise();
      this.listProduct = data;
      this.OriginalProduct = data;
      this.categoryName = null;
    } catch (error) {
      console.error('Error fetching products', error);
    }
  }
  
  resetPage() {
    this.value = 100000;
    this.highValue = 5000000;
    this.categoryName = '';
  
    this.router.navigate(['/shop']).then(() => {
      window.location.reload();
    });
  }
  async getAllCategory() {
    try {
      const data = await this.shopService.getAllCategoryCount().toPromise();
      this.listCate = data;
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  }

  async getProductByCategoryName(name: any) {
    if (!this.listCate) {
      await this.getAllCategory();
    }
    this.categoryId = this.commonService.findCategoryIdByName(name, this.listCate);
    if (this.categoryId) {
      try {
        this.p = 1;
        const data = await this.shopService.getAllProduct().toPromise();
        this.listProduct = data.filter((item: { category_id: any; }) => item.category_id === this.categoryId);
        this.OriginalProduct = this.listProduct;
      } catch (error) {
        console.error('Error fetching products', error);
      }
    }
  }

  onSortChange(event: any) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue === "lastest") {
      this.listProduct.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id);
    }
    if (selectedValue === "lowToHigh") {
      this.listProduct.sort((a: { price: number; }, b: { price: number; }) => a.price - b.price);
    }
    if (selectedValue === "highToLow") {
      this.listProduct.sort((a: { price: number; }, b: { price: number; }) => b.price - a.price);
    }
  }

  getProductByProductName(name: any) {
    this.listProduct = this.shopService.getProductByName(name);
  }

  addToCart(slug: any) {
    this.commonService.getProductBySlug(slug).subscribe((data) => {
      this.commonService.addToCart(data, 1);
      this.commonService.showAlerAside("Add cart successfully!", "success");
    });
  }

  filterByName(nameInput: HTMLInputElement) {
    let inputValue = nameInput.value.toLowerCase();
   
    if (inputValue) {
      this.listProduct = this.OriginalProduct.filter((product: { name: string }) => {
        return product.name.toLowerCase().includes(inputValue);
      });
    } else {
      this.listProduct = this.OriginalProduct;
    }
  }

  value: number = 100000;
  highValue: number = 5000000;

  options: Options = {
    floor: 0,
    ceil: 5000000
  };  
  filterByPriceRange() {
    this.listProduct = this.OriginalProduct.filter((product: any) => {
      return product.price >= this.value && product.price <= this.highValue;
    });
  }
  
}
