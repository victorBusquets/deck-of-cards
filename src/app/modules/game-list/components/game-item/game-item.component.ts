import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GameModel } from '@models/game.class';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule],
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss']
})
export class GameItemComponent {
  @Input() game!: GameModel;
  @Output() deleteAction: EventEmitter<string> = new EventEmitter<string>();

  deleteGame(event: Event, deckId: string): void {
    event.preventDefault();
    event.stopPropagation();
    this.deleteAction.emit(deckId);
  }
}
