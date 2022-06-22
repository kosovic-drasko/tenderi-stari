import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PomocService } from '../service/pomoc.service';

import { PomocComponent } from './pomoc.component';

describe('Pomoc Management Component', () => {
  let comp: PomocComponent;
  let fixture: ComponentFixture<PomocComponent>;
  let service: PomocService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PomocComponent],
    })
      .overrideTemplate(PomocComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PomocComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(PomocService);

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
    expect(comp.pomocs?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });
});
