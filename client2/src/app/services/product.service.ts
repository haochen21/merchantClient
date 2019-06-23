import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Category } from '../model/Category';
import { Product } from '../model/Product';
import { SecurityService } from './security.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class ProductService {

    //imagePreUrl: string = "http://127.0.0.1:8080/ticketServer/store/product/image/";

    imagePreUrl: string = "http://120.25.90.244:8080/ticketServer/store/product/image/";

    constructor(
        private http: HttpClient,
        private securityService: SecurityService) { }

    findCategoryByMerchant(): Observable<Category[]> {
        return this.http.get<Category[]>('api/category/find/merchant');
    }

    findCategoryByMerchantId(merchantId: number): Observable<Category[]> {
        return this.http.get<Category[]>('api/category/find/merchant/' + merchantId);
    }

    createCategory(category: Category): Observable<Category> {
        let body = JSON.stringify({ category });
        return this.http.post<Category>('api/category', body, httpOptions);
    }

    modifyCategory(category: Category): Observable<Category> {
        let body = JSON.stringify({ category });
        return this.http.put<Category>('api/category', body, httpOptions);
    }

    deleteCategory(id: number): Observable<any> {
        return this.http.delete<any>('api/category/' + id);
    }

    findCategory(id: number): Observable<Category> {
        return this.http.get<Category>('api/category/' + id);
    }

    createProduct(product: Product): Observable<Product> {
        let body = JSON.stringify({ product });
        return this.http.post<Product>('api/product', body, httpOptions);
    }

    modifyProduct(product: Product): Observable<Product> {
        let body = JSON.stringify({ product });
        return this.http.put<Product>('api/product', body, httpOptions);
    }

    findProduct(id: number): Observable<Product> {
        return this.http.get<Product>('api/product/' + id);
    }

    findProductByMerchant(): Observable<Product[]> {
        return this.http.get<Product[]>('api/product/find/merchant');
    }

    findProductByMerchantId(merchantId: number): Observable<Product[]> {
        return this.http.get<Product[]>('api/product/find/merchant/' + merchantId);
    }

    productExist(name: string): Observable<any> {
        return this.http.get<any>('api/product/exists/' + name);
    }

    modifyNeedPay(needPay: boolean): Observable<any> {
        let params = {
            needPay: needPay
        }
        return this.http.put('api/product/needPay', params);
    }

}   