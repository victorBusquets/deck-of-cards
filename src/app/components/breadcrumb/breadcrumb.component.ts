import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SubscriptionsBaseComponent } from '@components/subscriptions-base/subscriptions-base.component';
import { TRACK_BY_INDEX_FUNCTION } from '@constants/common.const';
import { BreadcrumbInterface } from '@interfaces/breadcrumb.interface';
import { takeUntil, filter, startWith } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent extends SubscriptionsBaseComponent {
  breadcrumbConfig: BreadcrumbInterface[] = [];
  trackByIndex = TRACK_BY_INDEX_FUNCTION;

  constructor(route: ActivatedRoute, private router: Router) {
    super();

    this.router.events
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(e => e instanceof NavigationEnd),
        startWith(this.router)
      )
      .subscribe(() => {
        this.breadcrumbConfig = route.snapshot.firstChild?.data['breadcrumbConfig'] || [];
      });
  }

  goToLink(breadcrumbItem: BreadcrumbInterface, last: boolean): void {
    if(!last) {
      this.router.navigate(breadcrumbItem.link)
    }
  }
}
