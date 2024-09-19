import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { combineLatest, map, tap } from 'rxjs';
import { ApiService } from '../../../data-access/services/api/api.service';
import { CandidatesTableComponent } from '../../../ui/candidates-table/candidates-table.component';
import { VoteComponent } from '../../../ui/vote/vote.component';
import { VotersTableComponent } from '../../../ui/voters-table/voters-table.component';
import { ElectionParticipantsForm } from '../../../util/models/voting-types';
import { Candidate, ElectionParticipants, Voter } from './../../../util/models/voting-models';

@Component({
  selector: 'lib-voting',
  standalone: true,
  imports: [CommonModule, MatDividerModule, VotersTableComponent, CandidatesTableComponent, VoteComponent],
  templateUrl: './voting.component.html',
  styleUrl: './voting.component.scss'
})
export class VotingComponent {
  constructor(private readonly apiService: ApiService, private fb: NonNullableFormBuilder) {}

  public electionParticipantsForm?: ElectionParticipantsForm;

  public vm$ = combineLatest([this.apiService.getAllVoters(), this.apiService.getAllCandidates()]).pipe(
    map(([voters, candidates]) => ({ voters, candidates } as ElectionParticipants)),
    tap((electionParticipants) => this.createForm(electionParticipants))
  );

  private createForm(electionParticipants: ElectionParticipants) {
    this.electionParticipantsForm = this.fb.group({
      voters: this.fb.array(electionParticipants.voters.map((voter) => this.fb.group<Voter>(voter))),
      candidates: this.fb.array(electionParticipants.candidates.map((candidate) => this.fb.group<Candidate>(candidate)))
    });
  }
}
