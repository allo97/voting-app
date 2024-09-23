import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDividerModule } from '@angular/material/divider';
import { BehaviorSubject, combineLatest, map, tap } from 'rxjs';
import { ApiService } from '../../../data-access/services/api/api.service';
import { VoteComponent } from '../../../ui/vote/vote.component';
import { VotingGenericTableComponent } from '../../../ui/voting-generic-table/voting-generic-table.component';
import { Candidate, ElectionParticipants, Voter } from '../../../util/models/voting-models';

@Component({
  selector: 'lib-voting-container',
  standalone: true,
  imports: [CommonModule, MatDividerModule, VoteComponent, VotingGenericTableComponent],
  templateUrl: './voting-container.component.html',
  styleUrl: './voting-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VotingContainerComponent {
  private destroyRef = inject(DestroyRef);

  constructor(private readonly apiService: ApiService) {}

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

  public addCandidate(candidate: Candidate) {
    this.apiService
      .createCandidate(candidate)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((newCandidate) => {
        this.candidatesState$?.next([...this.candidatesState$.value, newCandidate]);
      });
  }

  public removeCandidate(id: number) {
    this.apiService
      .deleteCandidate(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.candidatesState$?.next([...this.candidatesState$.value.slice(0, -1)]);
      });
  }

  public updateCandidate(candidate: Candidate) {
    if (candidate.id)
      this.apiService
        .updateCandidate(candidate.id, candidate)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.candidatesState$?.next(this.candidatesState$.value);
        });
  }
}
