import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store } from '@ngrx/store';

import { Mocks, ItemId } from 'src/tests';
import { DefaultIdPayload, DefaultPayload } from '~/models';
import { RouterService } from '~/services/router.service';
import { reducers, metaReducers, State } from '~/store';
import * as Items from '~/store/items';
import * as Recipes from '~/store/recipes';
import { SetColumnsAction, SetDisabledRecipesAction } from '~/store/settings';
import { ListComponent } from './list/list.component';
import { ListContainerComponent } from './list-container.component';

describe('ListContainerComponent', () => {
  let component: ListContainerComponent;
  let fixture: ComponentFixture<ListContainerComponent>;
  let store: Store<State>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ListComponent, ListContainerComponent],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(reducers, { metaReducers }),
      ],
      providers: [RouterService],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ListContainerComponent);
        component = fixture.componentInstance;
        store = TestBed.inject(Store);
        fixture.detectChanges();
      });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ignore an item', () => {
    spyOn(store, 'dispatch');
    const data = Mocks.Item1.id;
    component.child.ignoreItem.emit(data);
    expect(store.dispatch).toHaveBeenCalledWith(new Items.IgnoreAction(data));
  });

  it('should set belt', () => {
    spyOn(store, 'dispatch');
    const data: DefaultIdPayload = {
      id: Mocks.Item1.id,
      value: ItemId.TransportBelt,
      default: ItemId.TransportBelt,
    };
    component.child.setBelt.emit(data);
    expect(store.dispatch).toHaveBeenCalledWith(new Items.SetBeltAction(data));
  });

  it('should set factory', () => {
    spyOn(store, 'dispatch');
    const data: DefaultIdPayload = {
      id: Mocks.Recipe1.id,
      value: ItemId.StoneFurnace,
      default: ItemId.StoneFurnace,
    };
    component.child.setFactory.emit(data);
    expect(store.dispatch).toHaveBeenCalledWith(
      new Recipes.SetFactoryAction(data)
    );
  });

  it('should set factory modules', () => {
    spyOn(store, 'dispatch');
    const data: DefaultIdPayload<string[]> = {
      id: Mocks.Recipe1.id,
      value: [ItemId.SpeedModule],
      default: [],
    };
    component.child.setFactoryModules.emit(data);
    expect(store.dispatch).toHaveBeenCalledWith(
      new Recipes.SetFactoryModulesAction(data)
    );
  });

  it('should set beacon count', () => {
    spyOn(store, 'dispatch');
    const data: DefaultIdPayload<number> = {
      id: Mocks.Recipe1.id,
      value: 24,
      default: 16,
    };
    component.child.setBeaconCount.emit(data);
    expect(store.dispatch).toHaveBeenCalledWith(
      new Recipes.SetBeaconCountAction(data)
    );
  });

  it('should set beacon', () => {
    spyOn(store, 'dispatch');
    const data: DefaultIdPayload = {
      id: Mocks.Recipe1.id,
      value: ItemId.Beacon,
      default: ItemId.Beacon,
    };
    component.child.setBeacon.emit(data);
    expect(store.dispatch).toHaveBeenCalledWith(
      new Recipes.SetBeaconAction(data)
    );
  });

  it('should set beacon modules', () => {
    spyOn(store, 'dispatch');
    const data: DefaultIdPayload<string[]> = {
      id: Mocks.Recipe1.id,
      value: [ItemId.SpeedModule],
      default: [ItemId.SpeedModule],
    };
    component.child.setBeaconModules.emit(data);
    expect(store.dispatch).toHaveBeenCalledWith(
      new Recipes.SetBeaconModulesAction(data)
    );
  });

  it('should set the visible columns', () => {
    spyOn(store, 'dispatch');
    const data = ['id'];
    component.child.setColumns.emit(data);
    expect(store.dispatch).toHaveBeenCalledWith(new SetColumnsAction(data));
  });

  it('should reset item to default', () => {
    spyOn(store, 'dispatch');
    const data = Mocks.Item1.id;
    component.child.resetItem.emit(data);
    expect(store.dispatch).toHaveBeenCalledWith(new Items.ResetAction(data));
  });

  it('should reset recipe to default', () => {
    spyOn(store, 'dispatch');
    const data = Mocks.Recipe1.id;
    component.child.resetRecipe.emit(data);
    expect(store.dispatch).toHaveBeenCalledWith(new Recipes.ResetAction(data));
  });

  it('should reset ignore modifications', () => {
    spyOn(store, 'dispatch');
    component.child.resetIgnore.emit();
    expect(store.dispatch).toHaveBeenCalledWith(new Items.ResetIgnoreAction());
  });

  it('should reset belt modifications', () => {
    spyOn(store, 'dispatch');
    component.child.resetBelt.emit();
    expect(store.dispatch).toHaveBeenCalledWith(new Items.ResetBeltAction());
  });

  it('should reset factory modifications', () => {
    spyOn(store, 'dispatch');
    component.child.resetFactory.emit();
    expect(store.dispatch).toHaveBeenCalledWith(
      new Recipes.ResetFactoryAction()
    );
  });

  it('should reset beacon modifications', () => {
    spyOn(store, 'dispatch');
    component.child.resetBeacons.emit();
    expect(store.dispatch).toHaveBeenCalledWith(
      new Recipes.ResetBeaconsAction()
    );
  });

  it('should set the list of disabled recipes', () => {
    spyOn(store, 'dispatch');
    const value: DefaultPayload<string[]> = { value: [], default: [] };
    component.child.setDisabledRecipes.emit(value);
    expect(store.dispatch).toHaveBeenCalledWith(
      new SetDisabledRecipesAction(value)
    );
  });
});
