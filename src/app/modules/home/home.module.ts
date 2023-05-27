import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home-routing.module";
import { CardComponent } from "@components/card/card.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [HomeComponent],
    imports: [HomeRoutingModule, CardComponent, RouterModule, CommonModule],
})
export class HomeModule { }