import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PonudjaciComponent } from './list/ponudjaci.component';
import { PonudjaciUpdateComponent } from './update/ponudjaci-update.component';
import { PonudjaciDeleteDialogComponent } from './delete/ponudjaci-delete-dialog.component';
import { PonudjaciRoutingModule } from './route/ponudjaci-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { JhMaterialModule } from 'app/shared/jh-material.module';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatSortModule } from '@angular/material/sort';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    SharedModule,
    PonudjaciRoutingModule,
    MatPaginatorModule,
    JhMaterialModule,
    MatTableExporterModule,
    MatSortModule,
    FontAwesomeModule,
  ],
  declarations: [PonudjaciComponent, PonudjaciUpdateComponent, PonudjaciDeleteDialogComponent],
  entryComponents: [PonudjaciDeleteDialogComponent],
})
export class PonudjaciModule {}
