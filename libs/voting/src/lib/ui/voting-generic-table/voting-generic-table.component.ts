import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTable, MatTableModule } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { Person } from '../../util/models/voting-models';

@Component({
  selector: 'lib-voting-generic-table',
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
  templateUrl: './voting-generic-table.component.html',
  styleUrl: './voting-generic-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VotingGenericTableComponent<T extends Person> {
  @Input({ required: true }) public dataSource$?: BehaviorSubject<T[]>;
  @Input({ required: true }) public newRow?: T;
  @Input({ required: true }) public title = '';
  @Input({ required: true }) public displayedColumns: string[] = [];

  @Output() public add = new EventEmitter<T>();
  @Output() public remove = new EventEmitter<number>();
  @Output() public update = new EventEmitter<T>();

  @ViewChild(MatTable) private table?: MatTable<T>;

  public addRow() {
    this.add.emit(this.newRow);
    this.table?.renderRows();
  }

  public removeLastRow() {
    const voter = this.dataSource$?.value[this.dataSource$?.value.length - 1];
    this.remove.emit(voter?.id);
    this.table?.renderRows();
  }

  public updateRow(row: T, value: string) {
    row.name = value;
    this.update.emit(row);
  }
}
