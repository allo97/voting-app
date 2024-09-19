import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTable, MatTableModule } from '@angular/material/table';
import { Voter } from '../../util/models/voting-models';
import { ElectionParticipantsForm } from '../../util/models/voting-types';

@Component({
  selector: 'lib-voters-table',
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
  templateUrl: './voters-table.component.html',
  styleUrl: './voters-table.component.scss'
})
export class VotersTableComponent {
  @Input({ required: true })
  public get electionParticipantsForm(): ElectionParticipantsForm | undefined {
    return this._electionParticipantsForm;
  }

  public set electionParticipantsForm(newElectionParticipantsForm: ElectionParticipantsForm | undefined) {
    this._electionParticipantsForm = newElectionParticipantsForm;
    if (newElectionParticipantsForm) this.dataSource = [...newElectionParticipantsForm.controls.voters.value];
  }

  private _electionParticipantsForm?: ElectionParticipantsForm;

  @Output() public add = new EventEmitter<Voter>();
  @Output() public remove = new EventEmitter<number>();

  @ViewChild(MatTable) private table?: MatTable<Voter>;

  public title = 'Voters';
  public displayedColumns: string[] = ['name', 'voted'];
  public dataSource: Partial<Voter>[] = [];

  constructor(private fb: NonNullableFormBuilder) {}

  public addRow() {
    const voter = { name: '', voted: false } as Voter;
    this.dataSource.push(voter);
    this.electionParticipantsForm?.controls.voters.push(this.fb.group(voter));
    this.table?.renderRows();
  }

  public removeRow() {
    this.dataSource.pop();
    this.electionParticipantsForm?.controls.voters.removeAt(
      this.electionParticipantsForm?.controls.voters.value.length - 1
    );
    this.table?.renderRows();
  }
}
