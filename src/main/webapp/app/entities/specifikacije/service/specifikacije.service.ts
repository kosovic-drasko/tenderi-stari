import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { ISpecifikacije, getSpecifikacijeIdentifier } from '../specifikacije.model';
import { createRequestOption } from '../../../core/request/request-util';
export type EntityResponseType = HttpResponse<ISpecifikacije>;
export type EntityArrayResponseType = HttpResponse<ISpecifikacije[]>;

@Injectable({ providedIn: 'root' })
export class SpecifikacijeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/specifikacijes');
  public resourceUrlExcelUpload = SERVER_API_URL + 'api/uploadfiles/specifikacije';
  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(specifikacije: ISpecifikacije): Observable<EntityResponseType> {
    return this.http.post<ISpecifikacije>(this.resourceUrl, specifikacije, { observe: 'response' });
  }
  update(specifikacije: ISpecifikacije): Observable<EntityResponseType> {
    return this.http.put<ISpecifikacije>(`${this.resourceUrl}/${getSpecifikacijeIdentifier(specifikacije) as number}`, specifikacije, {
      observe: 'response',
    });
  }
  UploadExcel(formData: FormData): any {
    const headers = new HttpHeaders();

    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    return this.http.post(this.resourceUrlExcelUpload, formData, { headers });
  }
  partialUpdate(specifikacije: ISpecifikacije): Observable<EntityResponseType> {
    return this.http.patch<ISpecifikacije>(`${this.resourceUrl}/${getSpecifikacijeIdentifier(specifikacije) as number}`, specifikacije, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISpecifikacije>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISpecifikacije[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  deleteSpecifikacije(id: number): void {
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
