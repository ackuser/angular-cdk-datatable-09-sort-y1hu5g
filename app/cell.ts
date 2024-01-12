import {
  ContentChild,
  Directive,
  Input,
  TemplateRef,
  QueryList,
} from '@angular/core';

@Directive({
  selector: '[cellDef]',
})
export class CellDef {
  constructor(public template: TemplateRef<any>) {}
}

@Directive({
  selector: '[headerCellDef]',
})
export class HeaderCellDef {
  constructor(public template: TemplateRef<any>) {}
}

@Directive({
  selector: '[columnDef]',
})
export class ColumnDef {
  @ContentChild(CellDef) cellDef;
  @ContentChild(HeaderCellDef) headerCellDef;
  @Input('columnDef') name: string;
  constructor() {}
}