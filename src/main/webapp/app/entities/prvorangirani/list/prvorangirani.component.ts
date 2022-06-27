import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { IPrvorangirani } from '../prvorangirani.model';
import { PrvorangiraniService } from '../service/prvorangirani.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-prvorangirani',
  templateUrl: './prvorangirani.component.html',
  styleUrls: ['./prvorangirani.component.scss'],
})
export class PrvorangiraniComponent implements OnInit, AfterViewInit {
  prvorangiranis?: HttpResponse<IPrvorangirani[]>;
  // ponude_ponudjaci?: IPonudePonudjaci[];
  ukupnaPonudjena?: number | null | undefined;
  ukupnaProcijenjena?: number | null | undefined;
  nadjiPonudjaca?: any;
  isLoading = false;
  public displayedColumns = [
    'sifra postupka',
    'sifra ponude',
    'broj partije',
    'atc',
    'zasticeni naziv',
    'procijenjena vrijednost',
    'kolicina',
    'ponudjena vrijednost',
    'rok isporuke',
    'naziv ponudjaca',
    'naziv proizvodjaca',
  ];

  public dataSource = new MatTableDataSource<IPrvorangirani>();
  sifraPostupka?: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() postupak: any;

  constructor(protected prvorangiraniService: PrvorangiraniService) {}
  ngOnInit(): void {
    this.getSifraPostupka();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getTotalPonudjana(): any {
    return (this.ukupnaPonudjena = this.dataSource.filteredData.map(t => t.ponudjenaVrijednost).reduce((acc, value) => acc! + value!, 0));
  }
  getTotalProcjenjena(): any {
    return (this.ukupnaProcijenjena = this.dataSource.filteredData
      .map(t => t.procijenjenaVrijednost)
      .reduce((acc, value) => acc! + value!, 0));
  }
  getSifraPostupka(): void {
    this.isLoading = true;
    this.prvorangiraniService
      .query({
        'sifraPostupka.in': this.postupak,
      })
      .subscribe({
        next: (res: HttpResponse<IPrvorangirani[]>) => {
          this.isLoading = false;
          this.dataSource.data = res.body ?? [];
          this.prvorangiranis = res;
          this.getTotalPonudjana();
          this.getTotalProcjenjena();
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }
}
