import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuessSuitRoutingModule } from './guess-suit-routing.module';
import { CardComponent } from '@components/card/card.component';
import { GuessSuitComponent } from './components/guess-suit/guess-suit.component';
import { DialogComponent } from '@components/dialog/dialog.component';
import { SpinnerDirective } from '@directives/spinner/spinner.directive';

@NgModule({
  declarations: [
    GuessSuitComponent
  ],
  imports: [
    GuessSuitRoutingModule,
    CommonModule,
    CardComponent,
    DialogComponent,
    SpinnerDirective
  ]
})
export class GuessSuitModule { }
