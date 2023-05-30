import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameItemComponent } from './game-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { GameModel } from '@models/game.class';

describe('GameItemComponent', () => {
  let component: GameItemComponent;
  let fixture: ComponentFixture<GameItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GameItemComponent, RouterTestingModule]
    });
    fixture = TestBed.createComponent(GameItemComponent);
    component = fixture.componentInstance;
    component.game = new GameModel();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
