import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { CommonService } from 'src/app/services/common.service';
declare var $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  listCate: any;
  cate: any = {};
  profileForm = new FormGroup({
    name: new FormControl(''),
  });
  submitted = false;

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private commonService: CommonService
  ) {}
  ngOnInit(): void {
    this.getList();
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }
  getList() {
    this.categoryService.getAll().subscribe((data) => {
      this.listCate = data;
    });
  }
  addCate(): void {
    this.submitted = true;

    if (this.profileForm.invalid) {
      return;
    }
    const newName: string | null = this.profileForm.value.name ?? null;
    if (!newName) {
      return;
    }
    if (this.checkDuplicate(newName)) {
      this.commonService.showAlerAside('Name have already had', 'warning');
      return;
    }
    this.categoryService.add(this.profileForm.value).subscribe((data) => {
      console.log(data);
      this.getList();
    });
  }

  onReset(): void {
    this.submitted = false;
    this.profileForm.reset();
  }
  deleteCate(id: any): void {
    this.commonService.confirmAlert();
    this.categoryService.delete(id).subscribe((data) => {
      this.getList();
      alert('Delete successfully');
    });
  }
  upDate(): void {
    const newName: string | null = this.profileForm.value.name ?? null;
    if (!newName) {
      return;
    }
    if (this.checkDuplicate(newName)) {
      this.commonService.showAlerAside('Name have already had', 'warning');
      return;
    }
    this.categoryService
      .update(this.cate.id, this.profileForm.value)
      .subscribe((data) => {
        $('#modelId').modal('hide');
        this.getList();
        this.commonService.showAlerAside(
          'Edit category successfully!!',
          'success'
        );
      });
  }
  edit(id: any): void {
    $('#modelId').modal('show');
    this.categoryService.find(id).subscribe((data) => {
      this.cate = data;
    });
  }
  checkDuplicate(name: string): boolean {
    return this.listCate.some((item: any) => item.name === name);
  }
}
