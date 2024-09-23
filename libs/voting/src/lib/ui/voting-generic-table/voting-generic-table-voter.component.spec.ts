import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Voter } from '../../util/models/voting-models';
import { VotingGenericTableComponent } from './voting-generic-table.component';

describe('GenericTableVoterComponent', () => {
  let component: VotingGenericTableComponent<Voter>;
  let fixture: ComponentFixture<VotingGenericTableComponent<Voter>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VotingGenericTableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(VotingGenericTableComponent<Voter>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
