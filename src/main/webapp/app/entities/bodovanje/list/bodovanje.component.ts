import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { IBodovanje } from '../bodovanje.model';
import { BodovanjeService } from '../service/bodovanje.service';

@Component({
  selector: 'jhi-bodovanje',
  templateUrl: './bodovanje.component.html',
})
export class BodovanjeComponent implements OnInit {
  bodovanjes?: IBodovanje[];
  isLoading = false;

  constructor(protected bodovanjeService: BodovanjeService) {}

  loadAll(): void {
    this.isLoading = true;

    this.bodovanjeService.query().subscribe({
      next: (res: HttpResponse<IBodovanje[]>) => {
        this.isLoading = false;
        this.bodovanjes = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IBodovanje): number {
    return item.id!;
  }
}
