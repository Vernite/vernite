/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockPage } from './mock.page';

describe('MockPage', () => {
  let component: MockPage;
  let fixture: ComponentFixture<MockPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [MockPage],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
