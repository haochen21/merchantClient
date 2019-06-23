import { CartStatus } from './CartStatus';

export class CartFilter {
    
    cartId: number;
    no: string;    
    merchantId: number;
    customerIds: Array<number>;
    statuses: Array<CartStatus>;
    needPay: boolean;  
    createTimeBefore: Date; 
    createTimeAfter: Date;
    takeBeginTimeBefore: Date; 
    takeBeginTimeAfter: Date;
    takeBeginTime: Date;
    takeEndTime: Date;
    productId: number;
    weixinPaid:boolean;
    page: number;
    size: number;
    
    constructor() { }
}