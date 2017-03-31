import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { StoreService } from '../core/store.service';
import { Category } from '../model/Category';

@Component({
  selector: 'cateogry-modify',
  templateUrl: './category-modify.component.html',
  styleUrls: ['./category-modify.component.css']
})
export class CategoryModifyComponent {

  private form: FormGroup;

  private sub: any;

  private id: number;

  constructor(
    private formBuilder: FormBuilder,
    private storeService: StoreService,
    private route: ActivatedRoute,
    private router: Router) {

    this.form = formBuilder.group({
      'name': ['', [Validators.minLength(2), Validators.maxLength(20)]],
      'description': ['', [Validators.minLength(4), Validators.maxLength(255)]],
      'sequence': ['1', ,],
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      console.log(+params['id']);
      this.id = +params['id']; // (+) converts string 'id' to a number
      
      this.storeService.findCategory(this.id).then(category => {
        (<FormControl>this.form.controls['name']).setValue(category.name);
        (<FormControl>this.form.controls['description']).setValue(category.description);
        let sequence = 0;
        if(category.sequence){
          sequence = category.sequence;
        }
        (<FormControl>this.form.controls['sequence']).setValue(sequence);
      }).catch(error => {
        console.log(error)
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit() {
    let category: Category = new Category();

    category.id = this.id;
    category.name = this.form.value.name;
    category.description = this.form.value.description;
    category.sequence = this.form.value.sequence;

    this.storeService.modifyCategory(category).then(value => {
      console.log(value);
      this.router.navigate(['/category']);
    }).catch(error => {
      console.log(error)
    });
  }
}