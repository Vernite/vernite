/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardTaskComponent } from './board-task.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogTestingProvider } from '@tests/helpers/mat-dialog-testing-provider.helper';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { IconComponent } from '@main/components/icon/icon.component';

describe('BoardTaskComponent', () => {
  let component: BoardTaskComponent;
  let fixture: ComponentFixture<BoardTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatMenuModule, MatDialogModule, HttpClientModule],
      declarations: [BoardTaskComponent, IconComponent],
      providers: [...MatDialogTestingProvider],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
