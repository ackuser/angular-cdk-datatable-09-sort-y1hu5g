import {
  Directive,
  HostListener,
  Optional,
  Output,
  EventEmitter
} from '@angular/core';

import { ColumnDef } from './cell';

export type SortDirection = 'asc' | 'desc' | '';

export interface Sort {
  active: string; 
  direction: SortDirection;
}

@Directive({
  selector: '[sort]',
})
export class SortDirective {

  active: string;
  direction: SortDirection;

  @Output() sortChange = new EventEmitter<Sort>();

  sort(sortHeader: SortHeaderDirective) {
    console.log(sortHeader, sortHeader.id);
    if (this.active != sortHeader.id) {
      this.active = sortHeader.id;
      this.direction = 'asc';
    } else {
      this.direction = this.direction === 'asc'
      ? 'desc'
      : 'asc';
    }
    this.sortChange.emit({
      active: this.active,
      direction: this.direction
    });
  }
}

@Directive({
  selector: '[sortHeader]',
})
export class SortHeaderDirective {
  @HostListener('click') onClick() {
    if (this.sort) {
      this.sort.sort(this);
    }
  }
  id: string;
  constructor(
    @Optional() public columnDef: ColumnDef,
    @Optional() public sort: SortDirective,
  ) { }

  ngOnInit() {
    if (this.columnDef) {
      this.id = this.columnDef.name;
    }
  }
}
