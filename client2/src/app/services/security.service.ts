import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Merchant } from '../model/Merchant';
import { OpenRange } from '../model/OpenRange';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class SecurityService {

    constructor(private http: HttpClient) { }

    menuName: String = 'order';

    setMenuName(name: String) {
        this.menuName = name;
    }

    getMenuName() {
        return this.menuName;
    }

    login(loginName: String, password: String): Observable<any> {
        let params = {
            loginName: loginName,
            password: password
        }
        return this.http.post('api/login', params, httpOptions);
    }

    logout() {
        return this.http.get('logout');
    }

    findMerchant(): Observable<Merchant> {
        return this.http.get<Merchant>('api/merchant');
    }

    findMerchantWithIntroduce(): Observable<Merchant> {
        return this.http.get<Merchant>('api/merchant/introduce');
    }

    registerMerchant(merchant: Merchant): Observable<Merchant> {
        let body = JSON.stringify({ merchant });
        return this.http.post<Merchant>('api/merchant', body, httpOptions);
    }

    modifyMerchant(merchant: Merchant): Observable<Merchant> {
        let body = JSON.stringify({ merchant });
        return this.http.put<Merchant>('api/merchant', body, httpOptions);
    }

    registerMerchantInWeixin(phone: String): Observable<any> {
        let params = {
            phone: phone
        }
        return this.http.put('api/merchant/weixin', params);
    }

    modifyPassword(password: String): Observable<any> {
        let params = {
            password: password
        }
        return this.http.put('api/password', params);
    }

    modifyOpen(open: boolean): Observable<any> {
        let params = {
            open: open
        }
        return this.http.put('api/merchant/open', params);
    }

    modifyTakeOut(takeOut: boolean): Observable<any> {
        let params = {
            takeOut: takeOut
        }
        return this.http.put('api/merchant/takeOut', params);
    }

    modifyIntroduce(introduce: string): Observable<any> {
        let params = {
            introduce: introduce
        }
        return this.http.put('api/merchant/introduce', params);
    }

    modifyQrCode(id: number): Observable<any> {
        return this.http.get('weixin/merchant/qrcode/' + id);
    }

    findOpenRanges(): Observable<Merchant> {
        return this.http.get<Merchant>('api/merchant/openRange');
    }

    findOpenRangesByMerchantId(merchantId: number): Observable<Merchant> {
        return this.http.get<Merchant>('api/merchant/openRange/' + merchantId);
    }

    createOpenRanges(openRanges: Array<OpenRange>): Observable<Merchant> {
        let body = JSON.stringify({ openRanges });
        return this.http.post<Merchant>('api/merchant/openRange', body, httpOptions);
    }

    merchantLock(password: String): Observable<any> {
        let params = {
            password: password
        }
        return this.http.post('api/merchant/lock', params);
    }
}