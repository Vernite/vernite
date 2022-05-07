/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainViewComponent } from './main-view.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('MainViewComponent', () => {
  let component: MainViewComponent;
  let fixture: ComponentFixture<MainViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [MainViewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
