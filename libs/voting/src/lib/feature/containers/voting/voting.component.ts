import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { BehaviorSubject, combineLatest, map, tap } from 'rxjs';
import { ApiService } from '../../../data-access/services/api/api.service';
import { CandidatesTableComponent } from '../../../ui/candidates-table/candidates-table.component';
import { VoteComponent } from '../../../ui/vote/vote.component';
import { VotersTableComponent } from '../../../ui/voters-table/voters-table.component';
import { Candidate, ElectionParticipants, Voter } from './../../../util/models/voting-models';

@Component({
  selector: 'lib-voting',
  standalone: true,
  imports: [CommonModule, MatDividerModule, VotersTableComponent, CandidatesTableComponent, VoteComponent],
  templateUrl: './voting.component.html',
  styleUrl: './voting.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VotingComponent implements OnInit {
  constructor(private readonly apiService: ApiService) {}

  ngOnInit(): void {
    this.votersState$.subscribe((data) => {
      console.log(data);
    });

    this.candidatesState$.subscribe((data) => {
      console.log(data);
    });
  }

  public votersState$ = new BehaviorSubject<Voter[]>([]);
  public candidatesState$ = new BehaviorSubject<Candidate[]>([]);

  public vm$ = combineLatest([this.apiService.getAllVoters(), this.apiService.getAllCandidates()]).pipe(
    map(([voters, candidates]) => ({ voters, candidates } as ElectionParticipants)),
    tap((electionParticipants) => {
      this.votersState$.next(electionParticipants.voters);
      this.candidatesState$.next(electionParticipants.candidates);
    })
  );
}
