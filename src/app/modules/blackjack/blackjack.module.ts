import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlackjackComponent } from './blackjack.component';
import { BlackjackRoutingModule } from './blackjack-routing.module';

@NgModule({
  declarations: [
    BlackjackComponent
  ],
  imports: [
    BlackjackRoutingModule,
    CommonModule
  ]
})
export class BlackjackModule { }
