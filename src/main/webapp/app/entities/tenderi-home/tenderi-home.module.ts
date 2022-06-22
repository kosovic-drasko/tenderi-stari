import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { TenderiHomeComponent } from './list/tenderi-home.component';
import { TenderiHomeRoutingModule } from './route/tenderi-home-routing.module';
// import { MatTabsModule } from '@angular/material/tabs';

import { JhMaterialModule } from '../../shared/jh-material.module';

import { MatTabsModule } from '@angular/material/tabs';
import { HideMeDirective } from './hide-me.directive';

@NgModule({
  imports: [SharedModule, TenderiHomeRoutingModule, MatTabsModule, JhMaterialModule],
  declarations: [TenderiHomeComponent, HideMeDirective],
})
export class TenderiHomeModule {}
