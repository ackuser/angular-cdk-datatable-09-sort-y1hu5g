import {
  Component,
  ComponentFactoryResolver,
  Directive,
  HostBinding,
  Input,
  TemplateRef,
  ViewChild,
  ContentChild,
  ViewContainerRef,
} from '@angular/core';

@Directive({ selector: '[cellOutlet]' })
export class CellOutlet {
  static recentCellOutlet: CellOutlet;
  constructor(public viewContainer: ViewContainerRef) {
    CellOutlet.recentCellOutlet = this;
  }
}

@Directive({
  selector: '[headerRowDef]',
})
export class HeaderRowDef {  
  constructor(public template: TemplateRef<any>) {
  }
}

@Directive({
  selector: '[rowDef]',
})
export class RowDef {  
  constructor(public template: TemplateRef<any>) {
  }
}
