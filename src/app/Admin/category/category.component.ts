import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { CommonService } from 'src/app/services/common.service';
import { ProductService } from 'src/app/services/product.service';
declare var $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  listCate: any;
  updatedDataCategory: any = {};
  formCategory = new FormGroup({
    name: new FormControl(''),
  });
  submitted = false;

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    this.getListCategory();
    this.formCategory = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }
  getListCategory() {
    this.categoryService.getAllCategory().subscribe((data) => {
      this.listCate = data;
    });
  }
  addCategory(): void {
    this.submitted = true;

    if (this.formCategory.invalid) {
      return;
    }
    const newName: string | null = this.formCategory.value.name ?? null;
    if (!newName) {
      return;
    }
    if (this.checkDuplicateCateName(newName)) {
      this.commonService.showAlerAside('Name have already had', 'warning');
      return;
    }
    this.categoryService.addCategory(this.formCategory.value).subscribe((data) => {
      console.log(data);
      this.getListCategory();
    });
  }
  deleteCategory(id: any): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(id).subscribe(
          (data) => {
            Swal.fire({
              title: "Deleted!",
              text: "Your category has been deleted.",
              icon: "success"
            });
            this.getListCategory();
          },
          (error) => {
            Swal.fire({
              title: "Failed!",
              text: "This category cannot be deleted because it has products.",
              icon: "error"
            });
          }
        );

      }
    });

  }
  updateCategory(): void {
    const newName: string | null = this.formCategory.value.name ?? null;
    if (!newName) {
      return;
    }
    if (this.checkDuplicateCateName(newName)) {
      this.commonService.showAlerAside('This category name have already had', 'warning');
      return;
    }
    this.categoryService
      .updateCategory(this.updatedDataCategory.id, this.formCategory.value)
      .subscribe((data) => {
        $('#modelId').modal('hide');
        this.getListCategory();
        this.commonService.showAlerAside(
          'Edit category successfully!!',
          'success'
        );
      });
  }
  editCategory(categoryId: any): void {
    $('#modelId').modal('show');
    this.categoryService.findCategory(categoryId).subscribe((data) => {
      this.updatedDataCategory = data;
    });
  }
  checkDuplicateCateName(categoryName: string): boolean {
    return this.listCate.some((item: any) => item.name === categoryName);
  }
}
