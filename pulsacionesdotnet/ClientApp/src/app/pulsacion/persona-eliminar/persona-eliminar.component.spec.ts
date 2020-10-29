import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaEliminarComponent } from './persona-eliminar.component';

describe('PersonaEliminarComponent', () => {
  let component: PersonaEliminarComponent;
  let fixture: ComponentFixture<PersonaEliminarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonaEliminarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
