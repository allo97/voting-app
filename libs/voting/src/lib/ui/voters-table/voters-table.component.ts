import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
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

  @ViewChild(MatTable) private table?: MatTable<Voter>;

  public title = 'Voters';
  public displayedColumns: string[] = ['name', 'voted'];

  public changeInput(element: Voter, value: string) {
    element.name = value;
    this.dataSource$?.next(this.dataSource$.value);
  }

  public addRow() {
    const newVoter = { name: '', voted: false } as Voter;
    this.dataSource$?.next([...this.dataSource$.value, newVoter]);
    this.table?.renderRows();
  }

  public removeRow() {
    this.dataSource$?.next([...this.dataSource$.value.slice(0, -1)]);
    this.table?.renderRows();
  }
}
