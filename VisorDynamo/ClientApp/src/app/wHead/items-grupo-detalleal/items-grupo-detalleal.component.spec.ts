import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsGrupoDetallealComponent } from './items-grupo-detalleal.component';

describe('ItemsGrupoDetallealComponent', () => {
  let component: ItemsGrupoDetallealComponent;
  let fixture: ComponentFixture<ItemsGrupoDetallealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsGrupoDetallealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsGrupoDetallealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
