import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchbarInSelectOptionComponent } from './searchbar-in-select-option.component';

describe('SearchbarInSelectOptionComponent', () => {
  let component: SearchbarInSelectOptionComponent;
  let fixture: ComponentFixture<SearchbarInSelectOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchbarInSelectOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchbarInSelectOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
