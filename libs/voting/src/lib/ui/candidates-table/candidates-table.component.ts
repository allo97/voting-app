import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
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

  @ViewChild(MatTable) private table?: MatTable<Candidate>;

  public title = 'Candidates';
  public displayedColumns: string[] = ['name', 'votes'];

  public changeInput(element: Candidate, value: string) {
    element.name = value;
    this.dataSource$?.next(this.dataSource$.value);
  }

  public addRow() {
    const newCandidate = { name: '', votes: 0 } as Candidate;
    this.dataSource$?.next([...this.dataSource$.value, newCandidate]);
    this.table?.renderRows();
  }

  public removeRow() {
    this.dataSource$?.next([...this.dataSource$.value.slice(0, -1)]);
    this.table?.renderRows();
  }
}
