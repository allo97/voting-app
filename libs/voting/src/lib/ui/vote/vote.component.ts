import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BehaviorSubject } from 'rxjs';
import { Voter } from '../../util/models/voting-models';
import { Candidate } from './../../util/models/voting-models';

@Component({
  selector: 'lib-vote',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './vote.component.html',
  styleUrl: './vote.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VoteComponent {
  @Input({ required: true }) public votersState$?: BehaviorSubject<Voter[]>;
  @Input({ required: true }) public candidatesState$?: BehaviorSubject<Candidate[]>;

  public voterName = '';
  public candidateName = '';

  public vote() {
    if (this.votersState$) {
      const voters = this.votersState$?.value;
      const index = voters?.findIndex((voter) => voter.name === this.voterName);
      if (index > -1) {
        voters[index].voted = true;

        this.votersState$?.next(voters);
      }
    }

    if (this.candidatesState$) {
      const candidates = this.candidatesState$?.value;
      const index = candidates?.findIndex((candidate) => candidate.name === this.candidateName);
      if (index > -1) {
        candidates[index].votes = candidates[index].votes + 1;

        this.candidatesState$?.next(candidates);
      }
    }
  }
}
