import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CartStatusFormatPipe } from './CartStatus.pipe';
import { DateFormatPipe } from './DateFormat.pipe';
import { MapToIterable } from './MapToIterable.pipe';
import { NumberFormatPipe } from './NumberFormat.pipe';
import { OpenRangeTypePipe } from './OpenRangeType.pipe';

import { ControlMessages } from './control-messages.component';

@NgModule({
    imports: [CommonModule],
    declarations: [CartStatusFormatPipe, DateFormatPipe, MapToIterable, NumberFormatPipe, OpenRangeTypePipe,ControlMessages],
    exports: [CartStatusFormatPipe, DateFormatPipe, MapToIterable, NumberFormatPipe, OpenRangeTypePipe, ControlMessages, CommonModule, FormsModule, HttpModule]
})
export class SharedModule { }
