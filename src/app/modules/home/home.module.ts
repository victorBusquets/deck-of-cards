import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home-routing.module";
import { CardComponent } from "@components/card/card.component";

@NgModule({
    declarations: [HomeComponent],
    imports: [HomeRoutingModule, CardComponent]
})
export class HomeModule { }