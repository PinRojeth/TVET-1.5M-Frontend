import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdPoorRquestComponent } from './id-poor-rquest.component';

describe('IdPoorRquestComponent', () => {
  let component: IdPoorRquestComponent;
  let fixture: ComponentFixture<IdPoorRquestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IdPoorRquestComponent]
    });
    fixture = TestBed.createComponent(IdPoorRquestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
