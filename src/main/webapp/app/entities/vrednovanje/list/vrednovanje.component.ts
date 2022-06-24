import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { IVrednovanje } from '../vrednovanje.model';
import { VrednovanjeService } from '../service/vrednovanje.service';
import { DecimalPipe } from '@angular/common';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PonudeService } from 'app/entities/ponude/service/ponude.service';

@Component({
  selector: 'jhi-vrednovanje',
  templateUrl: './vrednovanje.component.html',
  styleUrls: ['./vrednovanje.scss'],
})
export class VrednovanjeComponent implements AfterViewInit, OnInit {
  vrednovanjes?: HttpResponse<IVrednovanje[]>;
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
    'bod cijena',
    'bod rok',
    'bod ukupno',
  ];
  public dataSource = new MatTableDataSource<IVrednovanje>();
  sifraPostupka?: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() postupak: any;

  constructor(
    protected vrednovanjeService: VrednovanjeService,
    protected ponudeService: PonudeService,
    private _decimalPipe: DecimalPipe
  ) {}
  ngOnInit(): void {
    this.getSifraPostupka();
  }

  transformDecimal(num: string | number): any {
    return this._decimalPipe.transform(num, '1.2-2');
  }
  getSifraPostupka(): void {
    this.isLoading = true;
    this.vrednovanjeService
      .query({
        'sifraPostupka.in': this.postupak,
      })
      .subscribe({
        next: (res: HttpResponse<IVrednovanje[]>) => {
          this.isLoading = false;
          this.dataSource.data = res.body ?? [];
          this.vrednovanjes = res;
          this.getTotalPonudjana();
          this.getTotalProcjenjena();
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }
  getTotalPonudjana(): any {
    return (this.ukupnaPonudjena = this.dataSource.filteredData.map(t => t.ponudjenaVrijednost).reduce((acc, value) => acc! + value!, 0));
  }
  getTotalProcjenjena(): any {
    return (this.ukupnaProcijenjena = this.dataSource.filteredData
      .map(t => t.procijenjenaVrijednost)
      .reduce((acc, value) => acc! + value!, 0));
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
