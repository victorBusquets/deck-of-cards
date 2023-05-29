import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlackjackComponent } from './blackjack.component';
import { BlackjackRoutingModule } from './blackjack-routing.module';
import { CardComponent } from '@components/card/card.component';
import { SpinnerDirective } from '@directives/spinner/spinner.directive';

@NgModule({
  declarations: [
    BlackjackComponent
  ],
  imports: [
    BlackjackRoutingModule,
    CommonModule,
    CardComponent,
    SpinnerDirective
  ]
})
export class BlackjackModule { }
