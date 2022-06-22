import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPomoc, Pomoc } from '../pomoc.model';
import { PomocService } from '../service/pomoc.service';

@Injectable({ providedIn: 'root' })
export class PomocRoutingResolveService implements Resolve<IPomoc> {
  constructor(protected service: PomocService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPomoc> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((pomoc: HttpResponse<Pomoc>) => {
          if (pomoc.body) {
            return of(pomoc.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Pomoc());
  }
}
