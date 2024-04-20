import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSectorComponent } from './create-sector.component';

describe('CreateSectorComponent', () => {
  let component: CreateSectorComponent;
  let fixture: ComponentFixture<CreateSectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSectorComponent]
    });
    fixture = TestBed.createComponent(CreateSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
