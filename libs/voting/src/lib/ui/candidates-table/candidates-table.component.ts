import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTable, MatTableModule } from '@angular/material/table';
import { Candidate } from '../../util/models/voting-models';
import { ElectionParticipantsForm } from '../../util/models/voting-types';

@Component({
  selector: 'lib-candidates-table',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './candidates-table.component.html',
  styleUrl: './candidates-table.component.scss'
})
export class CandidatesTableComponent {
  @Input({ required: true })
  public get electionParticipantsForm(): ElectionParticipantsForm | undefined {
    return this._electionParticipantsForm;
  }

  public set electionParticipantsForm(newElectionParticipantsForm: ElectionParticipantsForm | undefined) {
    this._electionParticipantsForm = newElectionParticipantsForm;
    if (newElectionParticipantsForm) this.dataSource = [...newElectionParticipantsForm.controls.candidates.value];
  }

  private _electionParticipantsForm?: ElectionParticipantsForm;

  @Output() public add = new EventEmitter<Candidate>();
  @Output() public remove = new EventEmitter<number>();

  @ViewChild(MatTable) private table?: MatTable<Candidate>;

  public title = 'Candidates';
  public displayedColumns: string[] = ['name', 'votes'];
  public dataSource: Partial<Candidate>[] = [];

  constructor(private fb: NonNullableFormBuilder) {}

  public addRow() {
    const candidate = { name: '', votes: 0 } as Candidate;
    this.dataSource.push(candidate);
    this.electionParticipantsForm?.controls.candidates.push(this.fb.group(candidate));
    this.table?.renderRows();
  }

  public removeRow() {
    this.dataSource.pop();
    this.electionParticipantsForm?.controls.candidates.removeAt(
      this.electionParticipantsForm?.controls.candidates.value.length - 1
    );
    this.table?.renderRows();
  }
}
