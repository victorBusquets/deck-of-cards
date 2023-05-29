import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuessSuitRoutingModule } from './guess-suit-routing.module';
import { CardComponent } from '@components/card/card.component';
import { GuessSuitComponent } from './components/guess-suit/guess-suit.component';

@NgModule({
  declarations: [
    GuessSuitComponent
  ],
  imports: [
    GuessSuitRoutingModule,
    CommonModule,
    CardComponent
  ]
})
export class GuessSuitModule { }
