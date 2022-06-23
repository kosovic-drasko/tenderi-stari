import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { IBodovanje, Bodovanje } from '../bodovanje.model';
import { BodovanjeService } from '../service/bodovanje.service';

import { BodovanjeRoutingResolveService } from './bodovanje-routing-resolve.service';

describe('Bodovanje routing resolve service', () => {
  let mockRouter: Router;
  let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
  let routingResolveService: BodovanjeRoutingResolveService;
  let service: BodovanjeService;
  let resultBodovanje: IBodovanje | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({}),
            },
          },
        },
      ],
    });
    mockRouter = TestBed.inject(Router);
    jest.spyOn(mockRouter, 'navigate').mockImplementation(() => Promise.resolve(true));
    mockActivatedRouteSnapshot = TestBed.inject(ActivatedRoute).snapshot;
    routingResolveService = TestBed.inject(BodovanjeRoutingResolveService);
    service = TestBed.inject(BodovanjeService);
    resultBodovanje = undefined;
  });

  describe('resolve', () => {
    it('should return IBodovanje returned by find', () => {
      // GIVEN
      service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultBodovanje = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultBodovanje).toEqual({ id: 123 });
    });

    it('should return new IBodovanje if id is not provided', () => {
      // GIVEN
      service.find = jest.fn();
      mockActivatedRouteSnapshot.params = {};

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultBodovanje = result;
      });

      // THEN
      expect(service.find).not.toBeCalled();
      expect(resultBodovanje).toEqual(new Bodovanje());
    });

    it('should route to 404 page if data not found in server', () => {
      // GIVEN
      jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Bodovanje })));
      mockActivatedRouteSnapshot.params = { id: 123 };

      // WHEN
      routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
        resultBodovanje = result;
      });

      // THEN
      expect(service.find).toBeCalledWith(123);
      expect(resultBodovanje).toEqual(undefined);
      expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
    });
  });
});
