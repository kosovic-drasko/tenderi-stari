import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IBodovanje } from '../bodovanje.model';

import { BodovanjeService } from './bodovanje.service';

describe('Bodovanje Service', () => {
  let service: BodovanjeService;
  let httpMock: HttpTestingController;
  let elemDefault: IBodovanje;
  let expectedResult: IBodovanje | IBodovanje[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(BodovanjeService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      sifraPostupka: 0,
      sifraPonude: 0,
      brojPartije: 0,
      atc: 'AAAAAAA',
      nazivProizvodjaca: 'AAAAAAA',
      nazivPonudjaca: 'AAAAAAA',
      zasticeniNaziv: 'AAAAAAA',
      trazenaKolicina: 0,
      procijenjenaVrijednost: 0,
      ponudjenaVrijednost: 0,
      rokIsporuke: 0,
      bodCijena: 0,
      bodRok: 0,
      bodUkupno: 0,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should return a list of Bodovanje', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          sifraPostupka: 1,
          sifraPonude: 1,
          brojPartije: 1,
          atc: 'BBBBBB',
          nazivProizvodjaca: 'BBBBBB',
          nazivPonudjaca: 'BBBBBB',
          zasticeniNaziv: 'BBBBBB',
          trazenaKolicina: 1,
          procijenjenaVrijednost: 1,
          ponudjenaVrijednost: 1,
          rokIsporuke: 1,
          bodCijena: 1,
          bodRok: 1,
          bodUkupno: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    describe('addBodovanjeToCollectionIfMissing', () => {
      it('should add a Bodovanje to an empty array', () => {
        const bodovanje: IBodovanje = { id: 123 };
        expectedResult = service.addBodovanjeToCollectionIfMissing([], bodovanje);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(bodovanje);
      });

      it('should not add a Bodovanje to an array that contains it', () => {
        const bodovanje: IBodovanje = { id: 123 };
        const bodovanjeCollection: IBodovanje[] = [
          {
            ...bodovanje,
          },
          { id: 456 },
        ];
        expectedResult = service.addBodovanjeToCollectionIfMissing(bodovanjeCollection, bodovanje);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Bodovanje to an array that doesn't contain it", () => {
        const bodovanje: IBodovanje = { id: 123 };
        const bodovanjeCollection: IBodovanje[] = [{ id: 456 }];
        expectedResult = service.addBodovanjeToCollectionIfMissing(bodovanjeCollection, bodovanje);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(bodovanje);
      });

      it('should add only unique Bodovanje to an array', () => {
        const bodovanjeArray: IBodovanje[] = [{ id: 123 }, { id: 456 }, { id: 42180 }];
        const bodovanjeCollection: IBodovanje[] = [{ id: 123 }];
        expectedResult = service.addBodovanjeToCollectionIfMissing(bodovanjeCollection, ...bodovanjeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const bodovanje: IBodovanje = { id: 123 };
        const bodovanje2: IBodovanje = { id: 456 };
        expectedResult = service.addBodovanjeToCollectionIfMissing([], bodovanje, bodovanje2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(bodovanje);
        expect(expectedResult).toContain(bodovanje2);
      });

      it('should accept null and undefined values', () => {
        const bodovanje: IBodovanje = { id: 123 };
        expectedResult = service.addBodovanjeToCollectionIfMissing([], null, bodovanje, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(bodovanje);
      });

      it('should return initial array if no Bodovanje is added', () => {
        const bodovanjeCollection: IBodovanje[] = [{ id: 123 }];
        expectedResult = service.addBodovanjeToCollectionIfMissing(bodovanjeCollection, undefined, null);
        expect(expectedResult).toEqual(bodovanjeCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
