import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductServiceService } from 'src/app/services/product-service.service';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  listCate: any;
  imageSrc!: string;
  productId: any;
  product: any;
  formProduct: FormGroup;
  public Editor = DecoupledEditor;
  fileToUpload: File | null = null;
  imageUrl: string | null = null;
  slugElement: any;

  constructor(
    private productService: ProductServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    this.formProduct = this.fb.group({
      name: ['', Validators.required],
      slug: [''],
      description: [''],
      price: ['', Validators.required],
      product_quantity: ['', Validators.required],
      short_detail: [''],
      category_id: ['', Validators.required],
      status: [false]
    });
  }

  ngOnInit(): void {
    this.getProduct();
    this.getListCate();
  }

  getListCate(): void {
    this.categoryService.getAll().subscribe(data => {
      this.listCate = data;
    });
  }

  getProduct(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      if (this.productId) {
        this.productService.getProductById(this.productId).subscribe(
          productData => {
            this.product = productData;
            this.formProduct.patchValue({
              name: this.product.name,
              category_id: this.product.category_id,
              price: this.product.price,
              product_quantity: this.product.product_quantity,
              short_detail: this.product.short_detail,
              description: this.product.description,
              status: this.product.status
            });
            this.imageUrl = this.product.image;
          },
          error => {
            console.error('Error fetching product:', error);
          }
        );
      }
    });
  }

  updateProduct(): void {
    const formData = new FormData();
    Object.keys(this.formProduct.value).forEach(key => {
      formData.append(key, this.formProduct.value[key]);
    });

    if (this.fileToUpload) {
      formData.append('image', this.fileToUpload, this.fileToUpload.name);
    }else{
      formData.append('image', this.product.image);
    }
    formData.append('slug', this.slugElement.value);
    this.productService.edit(this.productId, formData).subscribe(
      data => {
        if (data) {
          alert('Edit product successfully');
          this.router.navigate(['/admin']);
        }
      },
      error => {
        console.error('Error updating product:', error);
      }
    );
  }

  ChangeToSlug()
{
    var title, slug;
 
    //Lấy text từ thẻ input title 
    var titleElement = document.getElementById("title");
  
    
    if (titleElement instanceof HTMLInputElement) {
      title = titleElement.value;
      slug = title.toLowerCase();
 
    //Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    //Xóa các ký tự đặt biệt
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    //Đổi khoảng trắng thành ký tự gạch ngang
    slug = slug.replace(/ /gi, " - ");
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');
    
    this.slugElement = document.getElementById('slug');

    if (this.slugElement instanceof HTMLInputElement) {
        this.slugElement.value = slug;
    }  
}
}

  handleFileInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files && files.length > 0) {
      this.fileToUpload = files.item(0);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      if (this.fileToUpload) {
        reader.readAsDataURL(this.fileToUpload);
      }
    }
  }

  public onReady(editor: DecoupledEditor): void {
    const element = editor.ui.getEditableElement()!;
    const parent = element.parentElement!;

    parent.insertBefore(editor.ui.view.toolbar.element!, element);
  }
}
