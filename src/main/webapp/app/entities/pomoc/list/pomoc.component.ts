import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { IPomoc } from '../pomoc.model';
import { PomocService } from '../service/pomoc.service';

@Component({
  selector: 'jhi-pomoc',
  templateUrl: './pomoc.component.html',
})
export class PomocComponent implements OnInit {
  pomocs?: IPomoc[];
  isLoading = false;

  constructor(protected pomocService: PomocService) {}

  loadAll(): void {
    this.isLoading = true;

    this.pomocService.query().subscribe({
      next: (res: HttpResponse<IPomoc[]>) => {
        this.isLoading = false;
        this.pomocs = res.body ?? [];
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(_index: number, item: IPomoc): number {
    return item.id!;
  }
}
