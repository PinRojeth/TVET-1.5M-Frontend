import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { NameModule } from 'src/app/shares/name/name.module';
import { StaticFilePipe } from 'src/app/shares/static-file/pipes/static-file.pipe';
import { StaticFileModule } from 'src/app/shares/static-file/static-file.module';

import { ContainerComponent } from './container.component';

describe('ContainerComponent', () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContainerComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        StaticFileModule,
        NameModule,
        MatMenuModule
      ],
      providers: [StaticFilePipe]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
