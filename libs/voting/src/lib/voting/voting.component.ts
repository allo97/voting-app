import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-voting',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './voting.component.html',
  styleUrl: './voting.component.scss',
})
export class VotingComponent {}
