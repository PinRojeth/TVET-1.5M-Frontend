import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSettingEditingComponent } from './account-setting-editing.component';

describe('AccountSettingEditingComponent', () => {
  let component: AccountSettingEditingComponent;
  let fixture: ComponentFixture<AccountSettingEditingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountSettingEditingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSettingEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
