import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenEditComponent } from './token-edit.component';

describe('TokenEditComponent', () => {
  let component: TokenEditComponent;
  let fixture: ComponentFixture<TokenEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TokenEditComponent]
    });
    fixture = TestBed.createComponent(TokenEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
