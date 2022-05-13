/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainModule } from '@main/_main.module';
import { IntegrationGithubComponent } from './integration-github.component';

describe('IntegrationGithubComponent', () => {
  let component: IntegrationGithubComponent;
  let fixture: ComponentFixture<IntegrationGithubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MainModule],
      declarations: [IntegrationGithubComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegrationGithubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
