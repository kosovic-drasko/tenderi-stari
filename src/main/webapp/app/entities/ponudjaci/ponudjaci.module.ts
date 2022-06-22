import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PonudjaciComponent } from './list/ponudjaci.component';
import { PonudjaciDetailComponent } from './detail/ponudjaci-detail.component';
import { PonudjaciUpdateComponent } from './update/ponudjaci-update.component';
import { PonudjaciDeleteDialogComponent } from './delete/ponudjaci-delete-dialog.component';
import { PonudjaciRoutingModule } from './route/ponudjaci-routing.module';
import { MatPaginator } from '@angular/material/paginator';

@NgModule({
  imports: [SharedModule, PonudjaciRoutingModule, MatPaginator],
  declarations: [PonudjaciComponent, PonudjaciDetailComponent, PonudjaciUpdateComponent, PonudjaciDeleteDialogComponent],
  entryComponents: [PonudjaciDeleteDialogComponent],
})
export class PonudjaciModule {}
