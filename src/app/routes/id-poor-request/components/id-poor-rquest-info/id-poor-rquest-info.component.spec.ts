import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdPoorRquestInfoComponent } from './id-poor-rquest-info.component';

describe('IdPoorRquestInfoComponent', () => {
  let component: IdPoorRquestInfoComponent;
  let fixture: ComponentFixture<IdPoorRquestInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IdPoorRquestInfoComponent]
    });
    fixture = TestBed.createComponent(IdPoorRquestInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
