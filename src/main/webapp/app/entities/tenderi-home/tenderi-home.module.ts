import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { TenderiHomeComponent } from './list/tenderi-home.component';
import { TenderiHomeRoutingModule } from './route/tenderi-home-routing.module';
// import { MatTabsModule } from '@angular/material/tabs';

import { JhMaterialModule } from '../../shared/jh-material.module';

import { MatTabsModule } from '@angular/material/tabs';
import { HideMeDirective } from './hide-me.directive';
import { PonudeModule } from '../ponude/ponude.module';
import { SpecifikacijeModule } from '../specifikacije/specifikacije.module';
import { VrednovanjeComponent } from '../vrednovanje/list/vrednovanje.component';
import { DecimalPipe } from '@angular/common';
import { PrvorangiraniComponent } from '../prvorangirani/list/prvorangirani.component';
import { HvalePonudeComponent } from '../hvale-ponude/list/hvale-ponude.component';

@NgModule({
  imports: [SharedModule, TenderiHomeRoutingModule, MatTabsModule, JhMaterialModule, SpecifikacijeModule, PonudeModule],
  declarations: [TenderiHomeComponent, HideMeDirective, VrednovanjeComponent, PrvorangiraniComponent, HvalePonudeComponent],
  providers: [DecimalPipe],
})
export class TenderiHomeModule {}
