import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_ROUTE_FRAGMENTS } from '@constants/app-routes.const';

const routes: Routes = [{
    path: APP_ROUTE_FRAGMENTS.home,
    loadChildren: () => import('./modules/home/home.module').then((m) => m.HomeModule),
  }, {
    path: "**",
    redirectTo: APP_ROUTE_FRAGMENTS.home
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
