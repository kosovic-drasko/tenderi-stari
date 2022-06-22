import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PostupciComponent } from './list/postupci.component';
import { PostupciDetailComponent } from './detail/postupci-detail.component';
import { PostupciUpdateComponent } from './update/postupci-update.component';
import { PostupciDeleteDialogComponent } from './delete/postupci-delete-dialog.component';
import { PostupciRoutingModule } from './route/postupci-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { JhMaterialModule } from 'app/shared/jh-material.module';
import { MatTableExporterModule } from 'mat-table-exporter';

@NgModule({
  imports: [SharedModule, PostupciRoutingModule, MatPaginatorModule, JhMaterialModule, MatTableExporterModule, MatSortModule],
  declarations: [PostupciComponent, PostupciDetailComponent, PostupciUpdateComponent, PostupciDeleteDialogComponent],
  entryComponents: [PostupciDeleteDialogComponent],
})
export class PostupciModule {}
