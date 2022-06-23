import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBodovanje } from '../bodovanje.model';

@Component({
  selector: 'jhi-bodovanje-detail',
  templateUrl: './bodovanje-detail.component.html',
})
export class BodovanjeDetailComponent implements OnInit {
  bodovanje: IBodovanje | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bodovanje }) => {
      this.bodovanje = bodovanje;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
