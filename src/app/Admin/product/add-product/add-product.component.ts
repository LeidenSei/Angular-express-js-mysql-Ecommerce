import { CategoryService } from './../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductServiceService } from 'src/app/services/product-service.service';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit{
  listCate:any;
  imageSrc!: string;
  listProduct:any;
  formProduct = new FormGroup(
    {
      name: new FormControl(''),
      slug: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl,
      product_quantity: new FormControl,
      short_detail: new FormControl(''),
      category_id: new FormControl(''),
      status: new FormControl('')
    }
  )
  slugElement: any;
  constructor(
    private productService:ProductServiceService, 
    private router:Router, 
    private categoryService:CategoryService,
    private commonService:CommonService
  ){}

  ngOnInit(): void {
    this.getListCategory();
    this.getAllProduct();
  }
  getAllProduct(){
    this.productService.getAll().subscribe((data)=>{
      this.listProduct = data;
    })
  }

  getListCategory() {
    this.categoryService.getAll().subscribe((data) => {
      this.listCate = data;
    });
  }

  addProduct():void{
    console.log(this.formProduct.value);
    let name:any = this.formProduct.value.name;
    let slug:any = this.formProduct.value.slug;
    let description:any = this.formProduct.value.description;
    let price:any = this.formProduct.value.price;
    let product_quantity:any = this.formProduct.value.product_quantity;
    let short_detail:any = this.formProduct.value.short_detail;
    let category_id:any = this.formProduct.value.category_id;
    let status:any= this.formProduct.value.status ? 1 : 0
    if (this.commonService.checkDuplicate(this.formProduct.value.name, this.listProduct)) {
      this.commonService.showAlerAside("This name have already had", "warning");
      return;
    }
    if(this.fileToUpload){
      const formData = new FormData();
      formData.append('image', this.fileToUpload, this.fileToUpload.name);
      formData.append('name', name);
      formData.append('slug', this.slugElement.value)
      formData.append('price', price);
      formData.append('product_quantity', product_quantity);
      formData.append('short_detail', short_detail);
      formData.append('description', description);
      formData.append('category_id', category_id);
      formData.append('status', status)

      this.productService.add(formData).subscribe(
        (data) => {
          if (data) {
            this.commonService.showAlerAside("Add product successfully", "success")
          }
        }
      )
    }
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


fileToUpload: File | null = null;
imageUrl: string | null = null;

handleFileInput(event: Event) {
  const target = event.target as HTMLInputElement;
  const files = target.files;

  if (files && files.length > 0) {
    this.fileToUpload = files.item(0);

    // Hiển thị trước hình ảnh
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };
    if (this.fileToUpload) {
      reader.readAsDataURL(this.fileToUpload);
    }
  }
}
public Editor = DecoupledEditor;

public onReady(editor: any): void {
  const element = editor.ui.getEditableElement()!;
  const parent = element.parentElement!;

  parent.insertBefore(
    editor.ui.view.toolbar.element!,
    element
  );
}
}

