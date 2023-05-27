import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuessSuitComponent } from './guess-suit.component';
import { GuessSuitRoutingModule } from './guess-suit-routing.module';

@NgModule({
  declarations: [
    GuessSuitComponent
  ],
  imports: [
    GuessSuitRoutingModule,
    CommonModule
  ]
})
export class GuessSuitModule { }
