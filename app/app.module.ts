import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { TableComponent } from './table';
import { HeaderRowDef ,RowDef, CellOutlet } from './row';
import { ColumnDef, HeaderCellDef, CellDef } from './cell';
import { SortHeaderDirective, SortDirective } from './sort';

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    AppComponent,

    // table
    TableComponent,

    // row
    HeaderRowDef,
    RowDef,
    CellOutlet,
    
    // cell
    ColumnDef,
    HeaderCellDef,
    CellDef,

    // sort
    SortHeaderDirective,
    SortDirective,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
