import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  private destroyRef = inject(DestroyRef);

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

  public addVoter(voter: Voter) {
    this.apiService
      .createVoter(voter)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((newVoter) => {
        this.votersState$?.next([...this.votersState$.value, newVoter]);
      });
  }

  public removeVoter(id: number) {
    this.apiService
      .deleteVoter(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.votersState$?.next([...this.votersState$.value.slice(0, -1)]);
      });
  }

  public updateVoter(voter: Voter) {
    if (voter.id)
      this.apiService
        .updateVoter(voter.id, voter)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.votersState$?.next(this.votersState$.value);
        });
  }
}
