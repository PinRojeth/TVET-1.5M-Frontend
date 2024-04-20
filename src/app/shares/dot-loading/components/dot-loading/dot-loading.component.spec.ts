import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotLoadingComponent } from './dot-loading.component';

describe('DotLoadingComponent', () => {
  let component: DotLoadingComponent;
  let fixture: ComponentFixture<DotLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DotLoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DotLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
