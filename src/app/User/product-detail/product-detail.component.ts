import { RatingService } from '../../services/rating.service';
import { CommonService } from 'src/app/services/common.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { RatingProduct } from 'src/app/models/rating-product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  slug: any;

  product: Product ={
    id: undefined,
    price: undefined,
    category_id: undefined,
    name: undefined,
    category: undefined,
    slug: undefined,
    short_detail: undefined,
    product_quantity: undefined,
    image: undefined,
    description: undefined,
    status: undefined
  };

  activeAlert: boolean = false;
  totalQuantity: any;
  user: any;
  relatedProduct:any;
  ratings: RatingProduct[] = [];
  page: number = 1;
  recentProducts:Product [] =[];
  itemsPerPage: number = 8;
  totalRatings: number | undefined;
  ratingCounts = {
    fiveStar: 0,
    fourStar: 0,
    threeStar: 0,
    twoStar: 0,
    oneStar: 0
  };
  

  constructor(
    private ratingService: RatingService,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private productService:ProductService
  ) {}

  ngOnInit(): void {
    this.loadInitialDataProductDetail();
  
  }
  loadInitialDataProductDetail(){
    this.route.paramMap.subscribe(params => {
      this.slug = params.get('slug')!;
      if (this.slug) {
        this.getProductDetail(this.slug, () => {
          this.getValueToSubmit();
          this.getRating(this.product.id);
        });
      }
    });
  }

  getProductDetail(slug: string, callback: () => void) {
    this.commonService.getProductBySlug(slug).subscribe((data) => { 
      this.product = data;
      this.commonService.addRecentProduct(data);
      this.getRelatedProduct(this.product.category_id, this.product.id)
      this.ratingService.getAllRatingProductById(this.product.id).subscribe((data)=>{
        this.ratings = data;
        this.getRatingsByStars();
      })
      if (callback) callback();
    });
  }

  quantity: number = 1;

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity() {
    this.quantity++;
  }

  updateQuantity(event: any) {
    this.quantity = parseInt(event.target.value, 10);
  }

  addToCart() {
    this.commonService.addToCart(this.product, this.quantity);
    this.activeAlert = true;
  }

  setStatusActive() {
    this.activeAlert = false;
  }

  ratingControl = new FormControl(1);

  getRating(value: number) {
    this.ratingForm.rating_star = value;
  }

  ratingForm: any = {
    user_id: '',
    fullname: '',
    email: '',
    product_id: '',
    rating_star: '',
    comment_product: '',
    avatar: ''
  };

  getRelatedProduct(id: any, idProduct: any) {
    this.productService.getAllProduct().subscribe(data => {
      this.relatedProduct = data
        .filter((item: { category_id: any; id: any; }) => item.category_id === id && item.id !== idProduct)
        .slice(0, 3);
    });
  }
  
  getValueToSubmit() {
    this.commonService.getUserIdInToken().subscribe((data) => {
      this.user = data;
      if (this.product) {
        this.ratingForm = {
          user_id: this.user ? this.user.id : '',
          fullname: this.user ? this.user.fullname : '',
          email: this.user ? this.user.email : '',
          product_id: this.product.id,
          rating_star: this.ratingControl.value || 0,
          comment_product: '',
          avatar: this.user ? this.user.avatar : ''
        };
      }
    });
  }

  getRatingsByStars() {
    this.ratingCounts.fiveStar = this.ratings.filter((rating: { rating_star: number; }) => rating.rating_star == 5).length;
    this.ratingCounts.fourStar = this.ratings.filter((rating: { rating_star: number; }) => rating.rating_star == 4).length;
    this.ratingCounts.threeStar = this.ratings.filter((rating: { rating_star: number; }) => rating.rating_star == 3).length;
    this.ratingCounts.twoStar = this.ratings.filter((rating: { rating_star: number; }) => rating.rating_star == 2).length;
    this.ratingCounts.oneStar = this.ratings.filter((rating: { rating_star: number; }) => rating.rating_star == 1).length;
  }
  getTotalRatings() {
    return Object.values(this.ratingCounts).reduce((a, b) => a + b, 0);
  }
  getPercentageWidthRating(ratingCount: number): number {
    this.totalRatings = this.getTotalRatings();
    if (this.totalRatings === 0) {
      return 0;
    }
    return (ratingCount / this.totalRatings) * 100;
  }  
  onSubmit() {
    this.ratingService.postRating(this.ratingForm).subscribe(
      response => {
        this.commonService.showAlert("Added your comment", "success")
        this.loadInitialDataProductDetail()
      },
      error => {
        console.error('Error adding comment:', error);
        alert("Failed to add comment. Please try again.");
      }
    );
  }
}
