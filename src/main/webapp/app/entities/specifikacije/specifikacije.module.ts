import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SpecifikacijeComponent } from './list/specifikacije.component';
import { SpecifikacijeUpdateComponent } from './update/specifikacije-update.component';
import { SpecifikacijeDeleteDialogComponent } from './delete/specifikacije-delete-dialog.component';
import { SpecifikacijeRoutingModule } from './route/specifikacije-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { JhMaterialModule } from '../../shared/jh-material.module';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  imports: [
    SharedModule,
    SpecifikacijeRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    JhMaterialModule,
    MatTableExporterModule,
    MatSortModule,
  ],
  declarations: [SpecifikacijeComponent, SpecifikacijeUpdateComponent, SpecifikacijeDeleteDialogComponent],
  entryComponents: [SpecifikacijeDeleteDialogComponent],
  exports: [SpecifikacijeComponent],
})
export class SpecifikacijeModule {}
