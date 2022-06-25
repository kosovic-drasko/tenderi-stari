import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PrvorangiraniComponent } from './list/prvorangirani.component';
import { PrvorangiraniRoutingModule } from './route/prvorangirani-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { JhMaterialModule } from '../../shared/jh-material.module';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  imports: [
    SharedModule,
    PrvorangiraniRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    JhMaterialModule,
    MatTableExporterModule,
    MatSortModule,
  ],
  declarations: [PrvorangiraniComponent],
  entryComponents: [],
  exports: [PrvorangiraniComponent],
})
export class PrvorangiraniModule {}
