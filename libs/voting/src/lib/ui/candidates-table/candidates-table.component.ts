import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTable, MatTableModule } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { Candidate } from './../../util/models/voting-models';

@Component({
  selector: 'lib-candidates-table',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './candidates-table.component.html',
  styleUrl: './candidates-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CandidatesTableComponent {
  @Input() public dataSource$?: BehaviorSubject<Candidate[]>;
  @Output() public add = new EventEmitter<Candidate>();
  @Output() public remove = new EventEmitter<number>();
  @Output() public update = new EventEmitter<Candidate>();

  @ViewChild(MatTable) private table?: MatTable<Candidate>;

  public title = 'Candidates';
  public displayedColumns: string[] = ['name', 'votes'];

  public addRow() {
    const newCandidate = { name: '', votes: 0 } as Candidate;
    this.add.emit(newCandidate);
    this.table?.renderRows();
  }

  public removeLastRow() {
    const candidate = this.dataSource$?.value[this.dataSource$?.value.length - 1];
    this.remove.emit(candidate?.id);
    this.table?.renderRows();
  }

  public updateRow(row: Candidate, value: string) {
    row.name = value;
    this.update.emit(row);
  }
}
