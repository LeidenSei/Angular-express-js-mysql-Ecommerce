import { RatingService } from '../../services/rating.service';
import { CommonService } from './../../services/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from './../../services/shop.service';
import { Component, OnInit } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { shopCategory } from 'src/app/models/shop-category';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  listProduct: any;
  listCate:  shopCategory[] = [];
  page: number = 1;
  itemsPerPage: number = 6;
  categoryName: any = '';
  categoryId: any;
  itemCart: any;
  recentProducts: any;
  originalProduct: any;
  selectedDropdown: any = 'lastest';

  constructor(
    private shopService: ShopService, 
    private route: ActivatedRoute,
    private commonService: CommonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadInitialDataShop();
  }

  async loadInitialDataShop() {
    await this.getAllCategory();
    this.route.paramMap.subscribe(async params => {
      if (params.has('category-name')) {
        this.categoryName = params.get('category-name');
        await this.getProductByCategoryName(this.categoryName);
      } else {
        await this.getAllProduct();
      }
      this.originalProduct = this.listProduct;
      this.onSortChange();
      this.filterByPriceRange();
      this.recentProducts = this.commonService.getRecentProduct();
    });
  }

  async getAllProduct() {
    try {
      const data = await this.shopService.shopGetAllProduct().toPromise();
      this.listProduct = data;
      this.originalProduct = data;
      this.categoryName = null;
    } catch (error) {
      console.error(error);
    }
  }

  async getAllCategory() {
    try {
      const data = await this.shopService.ShopgetAllCategoryWithProduct().toPromise();
      this.listCate = data || [];
      console.log(this.listCate);
      
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  }

  async getProductByCategoryName(categoryName: any) {
    if (!this.listCate) {
      await this.getAllCategory();
    }
    this.categoryId = this.commonService.findCategoryIdByName(categoryName, this.listCate);
    if (this.categoryId) {
      try {
        this.page = 1;
        const data = await this.shopService.shopGetAllProduct().toPromise();
        this.listProduct = data.filter((item: { category_id: any; }) => item.category_id === this.categoryId);
        this.originalProduct = this.listProduct;
        this.onSortChange();
      } catch (error) {
        console.error('Error fetching products', error);
      }
    }
  }

  onSortChange(event?: any) {
    if (event) {
      this.selectedDropdown = (event.target as HTMLSelectElement).value;
    }
    const selectedValue = this.selectedDropdown;
     
    if (selectedValue === "lastest") {
      this.listProduct.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id);
    }
    if (selectedValue === "lowToHigh") {
      this.listProduct.sort((a: { price: number; }, b: { price: number; }) => a.price - b.price);
    }
    if (selectedValue === "highToLow") {
      this.listProduct.sort((a: { price: number; }, b: { price: number; }) => b.price - a.price);
    }
    if (selectedValue === "Rating") {
      this.listProduct.sort((a: { rating_avg: number; }, b: { rating_avg: number; }) => b.rating_avg - a.rating_avg);
    }
  }

  addToCart(productSlug: any) {
    this.commonService.getProductBySlug(productSlug).subscribe((data) => {
      this.commonService.addToCart(data, 1);
      this.commonService.showAlerAside("Add cart successfully!", "success");
    });
  }

  filterByName(nameInput: HTMLInputElement) {
    let inputValue = nameInput.value.toLowerCase();
   
    if (inputValue) {
      this.listProduct = this.originalProduct.filter((product: { name: string }) => {
        return product.name.toLowerCase().includes(inputValue);
      });
    } else {
      this.listProduct = this.originalProduct;
    }
  }

  minPrice: number = 100000;
  maxPrice: number = 5000000;

  options: Options = {
    floor: 0,
    ceil: 5000000
  };  
  
  filterByPriceRange() {
    this.listProduct = this.originalProduct?.filter((product: any) => {
      return product.price >= this.minPrice && product.price <= this.maxPrice;
    });
  }

  resetPage() {
    this.router.navigate(['/shop']);
  }
}
