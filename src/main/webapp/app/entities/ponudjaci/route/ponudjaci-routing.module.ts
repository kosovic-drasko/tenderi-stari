import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PonudjaciComponent } from '../list/ponudjaci.component';
import { PonudjaciUpdateComponent } from '../update/ponudjaci-update.component';

const ponudjaciRoute: Routes = [
  {
    path: '',
    component: PonudjaciComponent,
    canActivate: [UserRouteAccessService],
  },

  {
    path: 'new',
    component: PonudjaciUpdateComponent,

    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PonudjaciUpdateComponent,

    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ponudjaciRoute)],
  exports: [RouterModule],
})
export class PonudjaciRoutingModule {}
