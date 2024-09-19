import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTable, MatTableModule } from '@angular/material/table';
import { Person } from '../../util/models/voting-models';

@Component({
  selector: 'lib-voting-table',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, MatIconModule, MatCardModule],
  templateUrl: './voting-table.component.html',
  styleUrl: './voting-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VotingTableComponent<T extends Person> {
  @Input({ required: true })
  public get data(): T[] {
    return this._data;
  }

  public set data(newData: T[]) {
    this._data = newData;
    this.dataSource = [...newData];
  }

  private _data: T[] = [];

  @Input({ required: true }) public title = '';
  @Input({ required: true }) public displayedColumns: string[] = [];

  public dataSource: T[] = [];

  @ViewChild(MatTable) private table?: MatTable<T>;

  public addData() {
    const randomElementIndex = Math.floor(Math.random() * this.data.length);
    this.dataSource.push(this.data[randomElementIndex]);
    this.table?.renderRows();
  }

  public removeData() {
    this.dataSource.pop();
    this.table?.renderRows();
  }
}
