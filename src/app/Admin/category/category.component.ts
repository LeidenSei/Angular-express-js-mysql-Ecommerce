import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { CommonService } from 'src/app/services/common.service';
import { ProductService } from 'src/app/services/product.service';
import { Category } from 'src/app/models/category';
declare var $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  listCate: Category[] = [];
  updatedDataCategory: Category = {} as Category;
  formCategory: FormGroup;
  submitted = false;

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private commonService: CommonService
  ) {
    this.formCategory = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getListCategory();
  }

  getListCategory(): void {
    this.categoryService.getAllCategory().subscribe(
      (data) => {
        this.listCate = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
        this.commonService.showAlerAside('Error fetching categories', 'error');
      }
    );
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
      this.commonService.showAlerAside('Name already exists', 'warning');
      return;
    }

    this.categoryService.addCategory(this.formCategory.value).subscribe(
      (data) => {
        console.log(data);
        this.getListCategory();
        this.commonService.showAlerAside('Category added successfully', 'success');
      },
      (error) => {
        console.error('Error adding category:', error);
        this.commonService.showAlerAside('Error adding category', 'error');
      }
    );
  }

  deleteCategory(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(id).subscribe(
          (data) => {
            Swal.fire('Deleted!', 'Your category has been deleted.', 'success');
            this.getListCategory();
          },
          (error) => {
            Swal.fire('Failed!', 'This category cannot be deleted because it has products.', 'error');
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
      this.commonService.showAlerAside('This category name already exists', 'warning');
      return;
    }

    this.categoryService.updateCategory(this.updatedDataCategory.id!, this.formCategory.value).subscribe(
      (data) => {
        $('#modelId').modal('hide');
        this.getListCategory();
        this.commonService.showAlerAside('Category updated successfully!', 'success');
      },
      (error) => {
        console.error('Error updating category:', error);
        this.commonService.showAlerAside('Error updating category', 'error');
      }
    );
  }

  editCategory(categoryId: number): void {
    $('#modelId').modal('show');
    this.categoryService.findCategory(categoryId).subscribe(
      (data) => {
        this.updatedDataCategory = data;
        this.formCategory.patchValue(data);
      },
      (error) => {
        console.error('Error fetching category:', error);
        this.commonService.showAlerAside('Error fetching category', 'error');
      }
    );
  }

  checkDuplicateCateName(categoryName: string): boolean {
    return this.listCate.some((item) => item.name === categoryName);
  }
}
