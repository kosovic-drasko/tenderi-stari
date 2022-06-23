import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { BodovanjeService } from '../service/bodovanje.service';

import { BodovanjeComponent } from './bodovanje.component';

describe('Bodovanje Management Component', () => {
  let comp: BodovanjeComponent;
  let fixture: ComponentFixture<BodovanjeComponent>;
  let service: BodovanjeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [BodovanjeComponent],
    })
      .overrideTemplate(BodovanjeComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(BodovanjeComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(BodovanjeService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.bodovanjes?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
