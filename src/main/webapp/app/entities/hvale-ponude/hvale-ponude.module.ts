import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { HvalePonudeComponent } from './list/hvale-ponude.component';
import { HvalePonudeRoutingModule } from './route/hvale-ponude-routing.module';
import { JhMaterialModule } from '../../shared/jh-material.module';
import { MatTableModule } from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  imports: [
    SharedModule,
    HvalePonudeRoutingModule,
    JhMaterialModule,
    MatTableModule,
    MatTableExporterModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  declarations: [HvalePonudeComponent],
  entryComponents: [],
  exports: [HvalePonudeComponent],
})
export class HvalePonudeModule {}
