import { Component, Input } from '@angular/core';

import { OpenRange } from '../model/OpenRange';
import { CartStatus } from '../model/CartStatus';

@Component({
    selector: 'order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.css']
})
export class OrderListComponent {

    @Input()
    openRange: OpenRange;

    @Input()
    listLayout: boolean;

    getTotalOrder(): number {
        let value: number = 0;
        if (typeof this.openRange.statusStat === 'undefined' || !this.openRange.statusStat) {            
            return 0;
        }
        for (let stat of this.openRange.statusStat) {
            value = value + stat.total;
        }
        return value;
    }

    getTotalPrice(): number {
        let value: number = 0;
        if (typeof this.openRange.statusStat === 'undefined' || !this.openRange.statusStat) {
            return 0;
        }
        for (let stat of this.openRange.statusStat) {
            value = value + stat.price;
        }
        return value;
    }

    getTakeNumber(): number {
        if (typeof this.openRange.statusStat === 'undefined' || !this.openRange.statusStat) {
            return 0;
        }
        for (let stat of this.openRange.statusStat) {
            if (stat.status === CartStatus.DELIVERED) {
                return stat.total;
            }
        }
        return 0;
    }

    getUnTakeNumber(): number {
        if (typeof this.openRange.statusStat === 'undefined' || !this.openRange.statusStat) {
            return 0;
        }
        for (let stat of this.openRange.statusStat) {
            if (stat.status === CartStatus.CONFIRMED) {
                return stat.total;
            }
        }
        return 0;
    }
}    