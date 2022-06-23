import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { BodovanjeComponent } from './list/bodovanje.component';
import { BodovanjeDetailComponent } from './detail/bodovanje-detail.component';
import { BodovanjeRoutingModule } from './route/bodovanje-routing.module';

@NgModule({
  imports: [SharedModule, BodovanjeRoutingModule],
  declarations: [BodovanjeComponent, BodovanjeDetailComponent],
})
export class BodovanjeModule {}
