import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GameListComponent } from './game-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { GameModel } from '@models/game.class';
import { GameManagerService } from '@services/game-manager.service';
import { DECK_MOCK_RESPONSE } from '@constants/mocks/mock.const';
import { of } from 'rxjs';
import { DeckService } from '@services/deck.service';

describe('GameListComponent', () => {
  let component: GameListComponent;
  let fixture: ComponentFixture<GameListComponent>;
  let gameManagerService: GameManagerService;
  let deckService: DeckService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GameListComponent, RouterTestingModule, HttpClientModule]
    });
    fixture = TestBed.createComponent(GameListComponent);
    gameManagerService = TestBed.inject(GameManagerService);
    deckService = TestBed.inject(DeckService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deleteGame should call gameManagerService.deleteGame() and getGames()', ()=>{
    const spyService = spyOn(gameManagerService, 'deleteGame');
    const spyGetGames = spyOn<any>(component, 'getGames');
    component.deletedGame = new GameModel({deckId: 'aaa'});
    component.deleteGame();
    
    expect(component.deletedGame).toBeNull();
    expect(spyService).toHaveBeenCalled();
    expect(spyGetGames).toHaveBeenCalled();
  });

  it('showModal should call dialog showModal', ()=>{
    const spy = spyOn(component.createGameDialog, 'showModal');
    component.showModal();
    expect(spy).toHaveBeenCalled();
  });

  it('closeModal should call dialog closeModal', ()=>{
    const spy = spyOn(component.createGameDialog, 'closeModal');
    component.gameName = 'GameName';
    component.closeModal();
    expect(spy).toHaveBeenCalled();
    expect(component.gameName).toEqual('');
  });

  it('showDeleteModal should call confirmDeleteDialog showDeleteModal', ()=>{
    const spy = spyOn(component.confirmDeleteDialog, 'showModal');
    const game: GameModel = new GameModel({deckId: 'aaa'});
    component.showDeleteModal(game);
    expect(component.deletedGame).toEqual(game);
    expect(spy).toHaveBeenCalled();
  });

  it('closeDeleteModal should call confirmDeleteDialog closeDeleteModal', ()=>{
    const spy = spyOn(component.confirmDeleteDialog, 'closeModal');
    component.closeDeleteModal();
    expect(spy).toHaveBeenCalled();
  });

  it('createGame should call deckService.generateDeck() and goToGameDetail',  waitForAsync(()=>{
    const spy = spyOn<any>(component, 'goToGameDetail');
    spyOn(deckService, 'generateDeck').and.returnValue(of(DECK_MOCK_RESPONSE));
    component.gameName = 'GameName';
    component.createGame();
    fixture.detectChanges();
    
    expect(spy).toHaveBeenCalled();
  }));
});
