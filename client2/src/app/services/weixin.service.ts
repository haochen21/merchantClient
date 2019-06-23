import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WeixinService {

    constructor(private http: HttpClient) { }

    getJsConfig(): Observable<any> {
        return this.http.get('weixin/merchant/jsconfig');
    }

}    