import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, Output, ViewChild, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { IBaseTable, IColumns, IPaginationOptions, ITableActions } from '../../interfaces';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { ButtonComponent } from '../button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'ui-base-table',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, MatButtonModule, MatCardModule, MatPaginatorModule, MatMenuModule, MatIconModule, MatTableModule, MatSortModule, IconButtonComponent, ButtonComponent, ],
  templateUrl: './base-table.component.html',
  styleUrls: ['./base-table.component.scss']
})

export class BaseTableComponent<T> implements OnInit, OnChanges {
  @ViewChild('paginator') paginator: MatPaginator

  selectAll = false
  initial = false

  @Input() baseTable: IBaseTable<T> = {
    dataSource: [],
    columns: [],
    actions: [],
    paginateOptions: {
      page: 0,
      pageSize: 10,
    }
  }

  @Input() showActions = false
  @Input() actionMenu = false

  @Output() selectedRows: EventEmitter<T[]> = new EventEmitter<T[]>()
  @Output() pageChange: EventEmitter<PageEvent> = new EventEmitter<PageEvent>()
  @Output() actionClicked = new EventEmitter<T>();

  selection = new SelectionModel<T>(true, [])

  set paginatorOptions(pagination: IPaginationOptions) {
    if (!this.paginator) return

    this.paginator.pageIndex = pagination.page
    this.paginator.pageSize = pagination.pageSize
  }

  public _dataSource: MatTableDataSource<T[]> = new MatTableDataSource<T[]>([]);

  public displayedColumns: string[];

  ngOnInit(): void {
    this.displayedColumns = this.baseTable.columns.map((baseTable: IColumns<T>) => baseTable.caption)

    if (this.baseTable.actions && this.showActions && this.actionMenu) {
      this.displayedColumns.push('actions-menu')
    }

    if (this.baseTable.actions && this.showActions && !this.actionMenu) {
      this.displayedColumns.push('actions')
    }

    this.initial = true
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['baseTable']) {
      this.baseTable.actions = this.baseTable.actions ? this.baseTable.actions : []
      if (this.initial) {
        this.paginatorOptions = {
          page: this.baseTable.paginateOptions?.page ? this.baseTable.paginateOptions?.page : 0,
          pageSize: this.baseTable.paginateOptions?.pageSize ? this.baseTable.paginateOptions?.pageSize : 10
        }
      }
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this._dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selectedRows.emit([])
      this.selection.clear();
      return;
    }

    this.selection.select(...this._dataSource.data as T[]);

    this.selectedRows.emit(this.selection.selected)
  }

  onPageChangeEvent($event: PageEvent): void {
    this.pageChange.emit($event)
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }

    this.selectedRows.emit(this.selection.selected)
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  sortData(sort: Sort) {
    const data = this.baseTable.dataSource.slice();

    this.baseTable.dataSource = data.sort((a: any, b: any) => {
      const isAsc = sort.direction === 'asc';

      return this.compare(a[sort.active], b[sort.active], isAsc);
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}

