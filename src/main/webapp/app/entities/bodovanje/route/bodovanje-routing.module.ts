import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { BodovanjeComponent } from '../list/bodovanje.component';
import { BodovanjeDetailComponent } from '../detail/bodovanje-detail.component';
import { BodovanjeRoutingResolveService } from './bodovanje-routing-resolve.service';

const bodovanjeRoute: Routes = [
  {
    path: '',
    component: BodovanjeComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BodovanjeDetailComponent,
    resolve: {
      bodovanje: BodovanjeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(bodovanjeRoute)],
  exports: [RouterModule],
})
export class BodovanjeRoutingModule {}
