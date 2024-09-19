import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Candidate, Voter } from '../util/models/voting-models';

@Component({
  selector: 'lib-vote',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatButtonModule],
  templateUrl: './vote.component.html',
  styleUrl: './vote.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VoteComponent {
  @Input({ required: true }) public voters: Voter[] = [];
  @Input({ required: true }) public candidates: Candidate[] = [];
}
