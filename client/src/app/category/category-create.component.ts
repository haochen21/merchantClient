import { Component } from '@angular/core';
import { FormControl,FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { StoreService } from '../core/store.service';
import { Category } from '../model/Category';

@Component({
    selector: 'cateogry-create',
    templateUrl: './category-create.component.html',
    styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent { 

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private storeService: StoreService,
    private router: Router) {

    this.form = formBuilder.group({          
      'name': ['', [Validators.minLength(2), Validators.maxLength(20)]],
      'description': ['',[Validators.minLength(4), Validators.maxLength(255)]],
      'sequence': ['1', ,],
    });
  }

  onSubmit() {
    let category: Category = new Category();
    
    category.name = this.form.value.name;
    category.description = this.form.value.description;
    category.sequence = this.form.value.sequence;
    
    this.storeService.createCategory(category).then(value => {
      console.log(value);
      this.router.navigate(['/category']);
    }).catch(error => {
      console.log(error)
    });
  }
}