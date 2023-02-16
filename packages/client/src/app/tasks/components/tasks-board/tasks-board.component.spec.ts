/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './tasks-board.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ViewOptionsComponent } from '@dashboard/components/view-options/view-options.component';
import { MainModule } from '@main/_main.module';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MainModule, RouterTestingModule],
      declarations: [BoardComponent, ViewOptionsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
