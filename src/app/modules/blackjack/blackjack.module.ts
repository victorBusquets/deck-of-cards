import { NgModule } from '@angular/core';
import { BlackjackRoutingModule } from './blackjack-routing.module';
import { BlackjackComponent } from './components/blackjack/blackjack.component';

@NgModule({
  imports: [
    BlackjackRoutingModule,
    BlackjackComponent,
  ]
})
export class BlackjackModule { }
