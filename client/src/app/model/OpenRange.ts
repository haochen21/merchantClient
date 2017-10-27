import { CartStatusStat } from './CartStatusStat';
import { Product } from './Product';
import { OpenRangeType } from './OpenRangeType';

export class OpenRange {

    id: number;
    beginTime: Date;
    endTime: Date;
    type: OpenRangeType;
    statusStat: Array<CartStatusStat>;
    products: Array<Product>;
    
    index:number;
    checked:boolean;
    desc:string;
    takeBeginTime:Date;
    takeEndTime:Date;
    
    constructor() { }
}