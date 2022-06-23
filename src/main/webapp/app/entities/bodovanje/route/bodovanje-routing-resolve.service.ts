import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IBodovanje, Bodovanje } from '../bodovanje.model';
import { BodovanjeService } from '../service/bodovanje.service';

@Injectable({ providedIn: 'root' })
export class BodovanjeRoutingResolveService implements Resolve<IBodovanje> {
  constructor(protected service: BodovanjeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBodovanje> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((bodovanje: HttpResponse<Bodovanje>) => {
          if (bodovanje.body) {
            return of(bodovanje.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Bodovanje());
  }
}
