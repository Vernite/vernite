/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MainModule } from '@main/_main.module';
import { ViewOptionsComponent } from './view-options.component';

describe('ViewOptionsComponent', () => {
  let component: ViewOptionsComponent;
  let fixture: ComponentFixture<ViewOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MainModule, RouterTestingModule],
      declarations: [ViewOptionsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
