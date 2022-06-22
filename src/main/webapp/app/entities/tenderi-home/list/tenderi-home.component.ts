import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../../core/auth/account.service';

@Component({
  selector: 'jhi-tenderi-home',
  templateUrl: './tenderi-home.component.html',
  styleUrls: ['./tenderi-home.components.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TenderiHomeComponent implements OnInit {
  public sifra?: any;
  public postupak?: any;
  public vrsta?: boolean;

  constructor(protected activatedRoute: ActivatedRoute, private accountService: AccountService, protected router: Router) {}

  ngOnInit(): void {
    this.sifra = this.activatedRoute.snapshot.params['id'];

    this.activatedRoute.queryParams.subscribe(params => {
      this.postupak = params['postupak'];
    });
    if (this.postupak === 'otvoreni') {
      this.vrsta = true;
    } else {
      this.vrsta = false;
    }
  }
}
