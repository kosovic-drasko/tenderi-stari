import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PonudeComponent } from './list/ponude.component';
import { PonudeDetailComponent } from './detail/ponude-detail.component';
import { PonudeUpdateComponent } from './update/ponude-update.component';
import { PonudeDeleteDialogComponent } from './delete/ponude-delete-dialog.component';
import { PonudeRoutingModule } from './route/ponude-routing.module';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatPaginator } from '@angular/material/paginator';

@NgModule({
  imports: [SharedModule, PonudeRoutingModule, MatTableExporterModule, MatPaginator],
  declarations: [PonudeComponent, PonudeDetailComponent, PonudeUpdateComponent, PonudeDeleteDialogComponent],
  entryComponents: [PonudeDeleteDialogComponent],
  exports: [PonudeComponent],
})
export class PonudeModule {}
