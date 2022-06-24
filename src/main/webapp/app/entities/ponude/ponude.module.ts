import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PonudeComponent } from './list/ponude.component';
import { PonudeDetailComponent } from './detail/ponude-detail.component';
import { PonudeUpdateComponent } from './update/ponude-update.component';
import { PonudeDeleteDialogComponent } from './delete/ponude-delete-dialog.component';
import { PonudeRoutingModule } from './route/ponude-routing.module';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { JhMaterialModule } from 'app/shared/jh-material.module';

@NgModule({
  imports: [SharedModule, PonudeRoutingModule, MatPaginatorModule, JhMaterialModule, MatTableExporterModule, MatSortModule],
  declarations: [PonudeComponent, PonudeDetailComponent, PonudeUpdateComponent, PonudeDeleteDialogComponent],
  entryComponents: [PonudeDeleteDialogComponent],
  exports: [PonudeComponent],
})
export class PonudeModule {}
