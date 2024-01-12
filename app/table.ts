import {
  Component,
  ComponentFactoryResolver,
  Directive,
  HostBinding,
  Input,
  TemplateRef,
  ViewChild,
  ContentChild,
  ContentChildren,
  QueryList,
  ViewContainerRef,
} from '@angular/core';

import { HeaderRowDef, RowDef, CellOutlet } from './row';
import { ColumnDef } from './cell';

@Component({
  selector: 'my-table',
  templateUrl: './table.html',
})
export class TableComponent<T> {
  @ViewChild(HeaderRowDef) headerRow: HeaderRowDef;
  @ViewChild(RowDef) row: RowDef;

  @ContentChildren(ColumnDef) columnDefs: QueryList<ColumnDef>
  private columnDefsByName = new Map<string, ColumnDef>();

  @Input() displayedColumns: string[];
  @Input()
  get data() {
    return this._data;
  };
  set data(d: T[]) {
    this._data = d;
    if (this.isReady) {
      if (this.viewContainer.length > 0) {
        this.viewContainer.clear();
      }
      this.renderHeaderRow();
      this.renderRows();
    }
  }
  private _data: T[];

  isReady = false;

  constructor(private viewContainer: ViewContainerRef) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.isReady = true;

    this.columnDefs.toArray().forEach(def => {
      this.columnDefsByName.set(def.name, def);
    });

    setTimeout(() => {
      this.renderHeaderRow();
      this.renderRows();
    }, 0)
  }

  private renderHeaderRow() {
    this.viewContainer.createEmbeddedView(
      this.headerRow.template,
    );
    this.displayedColumns.forEach(name => {
      CellOutlet.recentCellOutlet.viewContainer.createEmbeddedView(
        this.columnDefsByName.get(name).headerCellDef.template,
      )
    });
  }

  private renderRows() {
    this.data.forEach((rowData) => {
      this.viewContainer.createEmbeddedView(
        this.row.template
      );
      this.displayedColumns.forEach(name => {
        CellOutlet.recentCellOutlet.viewContainer.createEmbeddedView(
          this.columnDefsByName.get(name).cellDef.template,
          { $implicit: rowData }
        )
      });
    });
  }
}
