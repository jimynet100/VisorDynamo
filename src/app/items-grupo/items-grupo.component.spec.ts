import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsGrupoComponent } from './items-grupo.component';

describe('ItemsGrupoComponent', () => {
  let component: ItemsGrupoComponent;
  let fixture: ComponentFixture<ItemsGrupoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsGrupoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
