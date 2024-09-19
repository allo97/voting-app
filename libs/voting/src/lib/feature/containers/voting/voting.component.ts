import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Voter } from '../../../util/models/voting-models';

const ELEMENT_DATA: Voter[] = [
  { name: 'Alek', voted: false },
  { name: 'Bob', voted: false }
];

@Component({
  selector: 'lib-voting',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTableModule],
  templateUrl: './voting.component.html',
  styleUrl: './voting.component.scss'
})
export class VotingComponent {
  displayedColumns: string[] = ['name', 'voted'];
  dataSource = [...ELEMENT_DATA];

  @ViewChild(MatTable) table?: MatTable<Voter>;

  addData() {
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    this.dataSource.push(ELEMENT_DATA[randomElementIndex]);
    this.table?.renderRows();
  }

  removeData() {
    this.dataSource.pop();
    this.table?.renderRows();
  }
}
