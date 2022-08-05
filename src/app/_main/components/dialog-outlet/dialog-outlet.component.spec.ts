/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOutletComponent } from './dialog-outlet.component';

describe('DialogOutletComponent', () => {
  let component: DialogOutletComponent;
  let fixture: ComponentFixture<DialogOutletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogOutletComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
