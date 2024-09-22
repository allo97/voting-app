import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTable, MatTableModule } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { Voter } from '../../util/models/voting-models';

@Component({
  selector: 'lib-voters-table',
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
  templateUrl: './voters-table.component.html',
  styleUrl: './voters-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VotersTableComponent {
  @Input() public dataSource$?: BehaviorSubject<Voter[]>;
  @Output() public add = new EventEmitter<Voter>();
  @Output() public remove = new EventEmitter<number>();
  @Output() public update = new EventEmitter<Voter>();

  @ViewChild(MatTable) private table?: MatTable<Voter>;

  public title = 'Voters';
  public displayedColumns: string[] = ['name', 'voted'];

  public addRow() {
    const newVoter = { name: '', voted: false } as Voter;
    this.add.emit(newVoter);
    this.table?.renderRows();
  }

  public removeLastRow() {
    const voter = this.dataSource$?.value[this.dataSource$?.value.length - 1];
    this.remove.emit(voter?.id);
    this.table?.renderRows();
  }

  public updateRow(row: Voter, value: string) {
    row.name = value;
    this.update.emit(row);
  }
}
