import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { ProductService } from '../../services/product.service';
import { Category } from '../../model/Category';

@Component({
  selector: 'cateogry-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router) {

    this.form = this.formBuilder.group({
      'name': ['', [Validators.minLength(2), Validators.maxLength(20)]],
      'description': ['', [Validators.minLength(4), Validators.maxLength(255)]],
      'sequence': ['1', ,],
    });
  }

  onSubmit() {
    let category: Category = new Category();

    category.name = this.form.value.name;
    category.description = this.form.value.description;
    category.sequence = this.form.value.sequence;

    this.productService.createCategory(category)
      .subscribe(value => {
        console.log(value);
        this.router.navigate(['/my/category']);
      });
  }

  getFormControl(name) {
    return this.form.get(name);
  }
}