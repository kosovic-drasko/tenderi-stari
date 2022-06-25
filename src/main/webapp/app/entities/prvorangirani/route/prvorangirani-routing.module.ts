import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PrvorangiraniComponent } from '../list/prvorangirani.component';

const prvorangiraniRoute: Routes = [
  {
    path: '',
    component: PrvorangiraniComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(prvorangiraniRoute)],
  exports: [RouterModule],
})
export class PrvorangiraniRoutingModule {}
