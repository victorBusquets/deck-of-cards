import { NgModule } from '@angular/core';
import { GuessSuitRoutingModule } from './guess-suit-routing.module';
import { GuessSuitComponent } from './components/guess-suit/guess-suit.component';


@NgModule({
  imports: [
    GuessSuitComponent,
    GuessSuitRoutingModule
  ]
})
export class GuessSuitModule { }
