import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IBodovanje, getBodovanjeIdentifier } from '../bodovanje.model';

export type EntityResponseType = HttpResponse<IBodovanje>;
export type EntityArrayResponseType = HttpResponse<IBodovanje[]>;

@Injectable({ providedIn: 'root' })
export class BodovanjeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/bodovanjes');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBodovanje>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBodovanje[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  addBodovanjeToCollectionIfMissing(
    bodovanjeCollection: IBodovanje[],
    ...bodovanjesToCheck: (IBodovanje | null | undefined)[]
  ): IBodovanje[] {
    const bodovanjes: IBodovanje[] = bodovanjesToCheck.filter(isPresent);
    if (bodovanjes.length > 0) {
      const bodovanjeCollectionIdentifiers = bodovanjeCollection.map(bodovanjeItem => getBodovanjeIdentifier(bodovanjeItem)!);
      const bodovanjesToAdd = bodovanjes.filter(bodovanjeItem => {
        const bodovanjeIdentifier = getBodovanjeIdentifier(bodovanjeItem);
        if (bodovanjeIdentifier == null || bodovanjeCollectionIdentifiers.includes(bodovanjeIdentifier)) {
          return false;
        }
        bodovanjeCollectionIdentifiers.push(bodovanjeIdentifier);
        return true;
      });
      return [...bodovanjesToAdd, ...bodovanjeCollection];
    }
    return bodovanjeCollection;
  }
}
