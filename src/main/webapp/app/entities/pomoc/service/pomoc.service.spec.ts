import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPomoc } from '../pomoc.model';

import { PomocService } from './pomoc.service';

describe('Pomoc Service', () => {
  let service: PomocService;
  let httpMock: HttpTestingController;
  let elemDefault: IPomoc;
  let expectedResult: IPomoc | IPomoc[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PomocService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
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

    it('should return a list of Pomoc', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
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

    describe('addPomocToCollectionIfMissing', () => {
      it('should add a Pomoc to an empty array', () => {
        const pomoc: IPomoc = { id: 123 };
        expectedResult = service.addPomocToCollectionIfMissing([], pomoc);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(pomoc);
      });

      it('should not add a Pomoc to an array that contains it', () => {
        const pomoc: IPomoc = { id: 123 };
        const pomocCollection: IPomoc[] = [
          {
            ...pomoc,
          },
          { id: 456 },
        ];
        expectedResult = service.addPomocToCollectionIfMissing(pomocCollection, pomoc);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Pomoc to an array that doesn't contain it", () => {
        const pomoc: IPomoc = { id: 123 };
        const pomocCollection: IPomoc[] = [{ id: 456 }];
        expectedResult = service.addPomocToCollectionIfMissing(pomocCollection, pomoc);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(pomoc);
      });

      it('should add only unique Pomoc to an array', () => {
        const pomocArray: IPomoc[] = [{ id: 123 }, { id: 456 }, { id: 79042 }];
        const pomocCollection: IPomoc[] = [{ id: 123 }];
        expectedResult = service.addPomocToCollectionIfMissing(pomocCollection, ...pomocArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const pomoc: IPomoc = { id: 123 };
        const pomoc2: IPomoc = { id: 456 };
        expectedResult = service.addPomocToCollectionIfMissing([], pomoc, pomoc2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(pomoc);
        expect(expectedResult).toContain(pomoc2);
      });

      it('should accept null and undefined values', () => {
        const pomoc: IPomoc = { id: 123 };
        expectedResult = service.addPomocToCollectionIfMissing([], null, pomoc, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(pomoc);
      });

      it('should return initial array if no Pomoc is added', () => {
        const pomocCollection: IPomoc[] = [{ id: 123 }];
        expectedResult = service.addPomocToCollectionIfMissing(pomocCollection, undefined, null);
        expect(expectedResult).toEqual(pomocCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
