import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ElectionParticipantsForm } from '../../util/models/voting-types';

@Component({
  selector: 'lib-vote',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './vote.component.html',
  styleUrl: './vote.component.scss'
})
export class VoteComponent {
  @Input({ required: true }) public electionParticipantsForm?: ElectionParticipantsForm;

  public form = new FormGroup({
    voter: new FormControl(''),
    candidate: new FormControl('')
  });

  public vote() {
    const voters = this.electionParticipantsForm?.value.voters;
    voters?.find((v) => v.name === this.form.value.voter);

    const voter = this.electionParticipantsForm?.controls.voters.controls.find(
      (x) => x.value.name === this.form.value.voter
    );
    voter?.controls.voted.setValue(true);

    const candidate = this.electionParticipantsForm?.controls.candidates.controls.find(
      (x) => x.value.name === this.form.value.candidate
    );
    candidate?.controls.votes.setValue((candidate.value.votes ?? 0) + 1);

    if (this.electionParticipantsForm) console.log(this.electionParticipantsForm.value);
  }
}
