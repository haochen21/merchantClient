import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { Category } from '../../model/Category';

@Component({
  selector: 'cateogry-modify',
  templateUrl: './category-modify.component.html',
  styleUrls: ['./category-modify.component.css']
})
export class CategoryModifyComponent implements OnInit {

  categoryModifyForm: FormGroup;

  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) {

    this.categoryModifyForm = this.formBuilder.group({
      'name': ['', [Validators.minLength(2), Validators.maxLength(20)]],
      'description': ['', [Validators.minLength(4), Validators.maxLength(255)]],
      'sequence': ['1', ,],
    });
  }

  ngOnInit() {
    this.id = +this.route.snapshot.params.id;
    this.productService.findCategory(this.id)
      .subscribe(category => {        
        (<FormControl>this.categoryModifyForm.controls['name']).setValue(category.name);
        (<FormControl>this.categoryModifyForm.controls['description']).setValue(category.description);
        let sequence = 0;
        if (category.sequence) {
          sequence = category.sequence;
        }
        (<FormControl>this.categoryModifyForm.controls['sequence']).setValue(sequence);
      });
  }

  onSubmit() {
    let category: Category = new Category();

    category.id = this.id;
    category.name = this.categoryModifyForm.value.name;
    category.description = this.categoryModifyForm.value.description;
    category.sequence = this.categoryModifyForm.value.sequence;

    this.productService.modifyCategory(category)
      .subscribe(value => {
        console.log(value);
        this.router.navigate(['/my/category']);
      });
  }

  getFormControl(name) {
    return this.categoryModifyForm.get(name);
  }
}