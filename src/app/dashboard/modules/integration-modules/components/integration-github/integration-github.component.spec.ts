/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainModule } from '@main/_main.module';
import { IntegrationGitHubComponent } from './integration-github.component';

describe('IntegrationGithubComponent', () => {
  let component: IntegrationGitHubComponent;
  let fixture: ComponentFixture<IntegrationGitHubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MainModule],
      declarations: [IntegrationGitHubComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegrationGitHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
