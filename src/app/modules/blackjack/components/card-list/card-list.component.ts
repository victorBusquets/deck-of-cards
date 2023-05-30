import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CardComponent } from '@components/card/card.component';
import { TRACK_BY_INDEX_FUNCTION } from '@constants/common.const';
import { SpinnerDirective } from '@directives/spinner/spinner.directive';
import { CardInterface } from '@interfaces/card.interface';

@Component({
  standalone: true,
  imports: [CardComponent, SpinnerDirective, CommonModule],
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent {
  @Input() cards!: CardInterface[];
  @Input() showLoading!: boolean;
  @Input() scoreMessage!: string;
  @Input() score!: number;
  trackByIndex = TRACK_BY_INDEX_FUNCTION;
}
