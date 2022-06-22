import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { IPostupci, getPostupciIdentifier } from '../postupci.model';

export type EntityResponseType = HttpResponse<IPostupci>;
export type EntityArrayResponseType = HttpResponse<IPostupci[]>;

@Injectable({ providedIn: 'root' })
export class PostupciService {
  [x: string]: any;
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/postupcis');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}
  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPostupci>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  create(postupci: IPostupci): Observable<EntityResponseType> {
    // const copy = this.convertDateFromClient(postupci);
    return this.http.post<IPostupci>(this.resourceUrl, postupci, { observe: 'response' });
    // .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(postupci: IPostupci): Observable<EntityResponseType> {
    return this.http.put<IPostupci>(`${this.resourceUrl}/${getPostupciIdentifier(postupci) as number}`, postupci, { observe: 'response' });
  }

  query(): Observable<EntityArrayResponseType> {
    return this.http.get<IPostupci[]>(this.resourceUrl, { observe: 'response' });
    // eslint-disable-next-line no-console
    console.log('To je iz servisa query ');
  }

  delete(id: number): any {
    return this.http.delete(`${this.resourceUrl}/${id}`);
    // eslint-disable-next-line no-console
    console.log('To je iz servisa  ');
  }

  deletePostupak(id: number): void {
    this.http.delete(`${this.resourceUrl}/${id}`).subscribe(
      () => {
        // eslint-disable-next-line no-console
        console.log('obrisano');
      },
      () => {
        // eslint-disable-next-line no-console
        console.log('nije obrisano');
      }
    );
  }
}
