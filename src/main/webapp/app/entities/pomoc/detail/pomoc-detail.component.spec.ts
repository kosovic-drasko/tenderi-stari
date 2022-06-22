import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PomocDetailComponent } from './pomoc-detail.component';

describe('Pomoc Management Detail Component', () => {
  let comp: PomocDetailComponent;
  let fixture: ComponentFixture<PomocDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PomocDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ pomoc: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PomocDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PomocDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load pomoc on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.pomoc).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
