import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'ponude',
        data: { pageTitle: 'tenderApp.ponude.home.title' },
        loadChildren: () => import('./ponude/ponude.module').then(m => m.PonudeModule),
      },
      {
        path: 'ponudjaci',
        data: { pageTitle: 'tenderApp.ponudjaci.home.title' },
        loadChildren: () => import('./ponudjaci/ponudjaci.module').then(m => m.PonudjaciModule),
      },
      {
        path: 'postupci',
        data: { pageTitle: 'tenderApp.postupci.home.title' },
        loadChildren: () => import('./postupci/postupci.module').then(m => m.PostupciModule),
      },
      {
        path: 'tenderi-home',
        data: { pageTitle: 'tenderApp.tenderiHome.home.title' },
        loadChildren: () => import('./tenderi-home/tenderi-home.module').then(m => m.TenderiHomeModule),
      },
      {
        path: 'specifikacije',
        data: { pageTitle: 'tenderApp.specifikacije.home.title' },
        loadChildren: () => import('./specifikacije/specifikacije.module').then(m => m.SpecifikacijeModule),
      },

      {
        path: 'pomoc',
        // data: { authorities: ['ROLE_MANAGER'], pageTitle: 'tenderApp.pomoc.home.title' },
        data: { pageTitle: 'tenderApp.pomoc.home.title' },
        loadChildren: () => import('./pomoc/pomoc.module').then(m => m.PomocModule),
      },
    ]),
  ],
})
export class EntityRoutingModule {}
