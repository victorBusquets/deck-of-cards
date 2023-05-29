import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_ROUTE_FRAGMENTS, APP_ROUTE_IDS } from '@constants/app-routes.const';
import { BREADCRUMB_OPTIONS } from '@constants/breadcrumb.conts';

const routes: Routes = [{
    path: APP_ROUTE_FRAGMENTS.home,
    data: { breadcrumbConfig: BREADCRUMB_OPTIONS['home'] },
    loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule),
  }, {
    path: APP_ROUTE_FRAGMENTS.gameList + APP_ROUTE_IDS.gameType,
    data: { breadcrumbConfig: BREADCRUMB_OPTIONS['gameList'] },
    loadChildren: () => import('./modules/game-list/game-list.module').then((m) => m.GameListModule),
  }, {
    path: APP_ROUTE_FRAGMENTS.blackjack + APP_ROUTE_IDS.deckId,
    data: { breadcrumbConfig: BREADCRUMB_OPTIONS['gameDetailBlackjack'] },
    loadChildren: () => import('./modules/blackjack/blackjack.module').then((m) => m.BlackjackModule),
  }, {
    path: APP_ROUTE_FRAGMENTS.guessSuit + APP_ROUTE_IDS.deckId,
    data: { breadcrumbConfig: BREADCRUMB_OPTIONS['gameDetailGuessSuit'] },
    loadChildren: () => import('./modules/guess-suit/guess-suit.module').then((m) => m.GuessSuitModule),
  }, {
    path: "**",
    redirectTo: APP_ROUTE_FRAGMENTS.home
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
