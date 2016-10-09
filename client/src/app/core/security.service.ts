import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Merchant } from '../model/Merchant';
import { Customer } from '../model/Customer';
import { OpenRange } from '../model/OpenRange';

@Injectable()
export class SecurityService {


    constructor(private http: Http) { }

    menuName: String = 'order';

    setMenuName(name: String) {
        this.menuName = name;
    }

    getMenuName() {
        return this.menuName;
    }

    login(loginName: String, password: String): Promise<any> {
        let params = {
            loginName: loginName,
            password: password
        }
        return this.http.post('api/login', params)
            .toPromise()
            .then(response => {
                console.log(response.json());
                return response.json();
            })
            .catch(this.handleError);
    }

    logout() {
        return this.http.get('logout')
            .toPromise()
            .then(response => {
                return { logout: true };
            })
            .catch(this.handleError);
    }

    findMerchant(): Promise<Merchant> {
        return this.http.get('api/merchant')
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(this.handleError);
    }

    findMerchantById(id: number): Promise<Merchant> {
        return this.http.get('api/merchant/' + id)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(this.handleError);
    }

    registerMerchant(merchant: Merchant): Promise<Merchant> {
        let body = JSON.stringify({ merchant });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('api/merchant', body, options)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(this.handleError);
    }

    modifyMerchant(merchant: Merchant): Promise<Merchant> {
        let body = JSON.stringify({ merchant });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.put('api/merchant', body, options)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(this.handleError);
    }

    registerMerchantInWeixin(phone: String): Promise<Merchant> {
        let params = {
            phone: phone
        }

        return this.http.put('api/merchant/weixin', params)
            .toPromise()
            .then(response => {
                return Promise.resolve();
            })
            .catch(this.handleError);
    }

    modifyPassword(password: String): Promise<any> {
        let params = {
            password: password
        }

        return this.http.put('api/password', params)
            .toPromise()
            .then(response => {
                return Promise.resolve();
            })
            .catch(this.handleError);
    }

    modifyOpen(open: boolean): Promise<any> {
        let params = {
            open: open
        }

        return this.http.put('api/merchant/open', params)
            .toPromise()
            .then(response => {
                return Promise.resolve();
            })
            .catch(this.handleError);
    }

    modifyQrCode(): Promise<any> {
        return this.http.put('api/merchant/qrCode', {})
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(this.handleError);
    }

    findOpenRanges(): Promise<Merchant> {
        return this.http.get('api/merchant/openRange')
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(this.handleError);
    }

    findOpenRangesByMerchantId(merchantId: number): Promise<Merchant> {
        return this.http.get('api/merchant/openRange/' + merchantId)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(this.handleError);
    }

    createOpenRanges(openRanges: Array<OpenRange>): Promise<Merchant> {
        let body = JSON.stringify({ openRanges });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('api/merchant/openRange', body, options)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(this.handleError);
    }

    merchantLock(password: String): Promise<any> {
        let params = {
            password: password
        }

        return this.http.post('api/merchant/lock', params)
            .toPromise()
            .then(response => {
                return response.json();
            })
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}