import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPomoc } from '../pomoc.model';

@Component({
  selector: 'jhi-pomoc-detail',
  templateUrl: './pomoc-detail.component.html',
})
export class PomocDetailComponent implements OnInit {
  pomoc: IPomoc | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pomoc }) => {
      this.pomoc = pomoc;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
