import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { VoteComponent } from '../../../ui/vote.component';
import { VotingTableComponent } from '../../../ui/voting-table/voting-table.component';
import { Candidate, Voter } from '../../../util/models/voting-models';

@Component({
  selector: 'lib-voting',
  standalone: true,
  imports: [CommonModule, MatDividerModule, VotingTableComponent, VoteComponent],
  templateUrl: './voting.component.html',
  styleUrl: './voting.component.scss'
})
export class VotingComponent {
  public voters: Voter[] = [
    { name: 'Alek', voted: true },
    { name: 'Bob', voted: false }
  ];

  public candidates: Candidate[] = [
    { name: 'Alek candidate', votes: 0 },
    { name: 'Bob candidate', votes: 0 }
  ];
}
