import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BodovanjeDetailComponent } from './bodovanje-detail.component';

describe('Bodovanje Management Detail Component', () => {
  let comp: BodovanjeDetailComponent;
  let fixture: ComponentFixture<BodovanjeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BodovanjeDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ bodovanje: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(BodovanjeDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(BodovanjeDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load bodovanje on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.bodovanje).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
