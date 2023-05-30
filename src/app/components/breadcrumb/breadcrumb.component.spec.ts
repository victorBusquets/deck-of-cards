import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbComponent } from './breadcrumb.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BREAD_CRUMB_ITEM_MOCK } from '@constants/mocks/mock.const';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BreadcrumbComponent, RouterTestingModule]
    });
    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('goToLink not last item should call navigate', ()=>{
    const spy = spyOn(component['router'], 'navigate');
    component.goToLink(BREAD_CRUMB_ITEM_MOCK, false);

    expect(spy).toHaveBeenCalled();
  });

  it('goToLink last item should not do any', ()=>{
    const spy = spyOn(component['router'], 'navigate');
    component.goToLink(BREAD_CRUMB_ITEM_MOCK, true);

    expect(spy).not.toHaveBeenCalled();
  });

});
