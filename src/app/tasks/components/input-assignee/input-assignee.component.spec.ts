/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAssigneeComponent } from './input-assignee.component';

describe(InputAssigneeComponent.name, () => {
  let component: InputAssigneeComponent;
  let fixture: ComponentFixture<InputAssigneeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputAssigneeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputAssigneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
