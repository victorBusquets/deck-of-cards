import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home-routing.module";
import { CardComponent } from "@components/card/card.component";
import { GameManagerService } from "@services/game-manager.service";

@NgModule({
    declarations: [HomeComponent],
    imports: [HomeRoutingModule, CardComponent],
    providers: [GameManagerService]
})
export class HomeModule { }