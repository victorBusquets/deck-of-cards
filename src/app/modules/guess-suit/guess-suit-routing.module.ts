import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuessSuitComponent } from './components/guess-suit/guess-suit.component';

const routes: Routes = [
  {
    path: '',
    component: GuessSuitComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuessSuitRoutingModule {}