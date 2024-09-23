import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Candidate } from '../../util/models/voting-models';
import { VotingGenericTableComponent } from './voting-generic-table.component';

describe('GenericTableVoterComponent', () => {
  let component: VotingGenericTableComponent<Candidate>;
  let fixture: ComponentFixture<VotingGenericTableComponent<Candidate>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VotingGenericTableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(VotingGenericTableComponent<Candidate>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
