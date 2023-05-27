import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionsBaseComponent } from '@components/subscriptions-base/subscriptions-base.component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent extends SubscriptionsBaseComponent {
  gameType!: 'blackjack' | 'guess-suit';

  constructor(private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
      this.gameType = params['gameType'];
    });
  }
}
