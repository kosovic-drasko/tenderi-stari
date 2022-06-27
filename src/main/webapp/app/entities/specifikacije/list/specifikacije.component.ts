import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ISpecifikacije } from '../specifikacije.model';
import { SpecifikacijeService } from '../service/specifikacije.service';
import { SpecifikacijeDeleteDialogComponent } from '../delete/specifikacije-delete-dialog.component';
import { Account } from '../../../core/auth/account.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AccountService } from '../../../core/auth/account.service';
import { MatTableDataSource } from '@angular/material/table';
import { SpecifikacijeUpdateComponent } from '../update/specifikacije-update.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-specifikacije',
  templateUrl: './specifikacije.component.html',
  styleUrls: ['./specifikacije.scss'],
})
export class SpecifikacijeComponent implements AfterViewInit, OnInit {
  specifikacijes?: HttpResponse<ISpecifikacije[]>;
  account: Account | null = null;
  ukupnaProcijenjena?: number;
  aktivno?: boolean;
  id?: number;
  index?: number;
  brojObrazac: number = 0;
  isLoading = false;
  sifraPostupka?: null;

  public resourceUrlExcelDownload = SERVER_API_URL + 'api/specifikacije/file';
  public displayedColumns = [
    'sifra postupka',
    'broj partije',
    'atc',
    'inn',
    'farmaceutski oblik',
    'jacina lijeka',
    'trazena kolicina',
    'pakovanje',
    'jedinica mjere',
    'procijenjena vrijednost',
    'delete',
    'edit',
  ];

  public dataSource = new MatTableDataSource<ISpecifikacije>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() postupak?: any;
  @ViewChild('fileInput') fileInput: any;
  message: string | undefined;

  constructor(
    protected specifikacijaService: SpecifikacijeService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    private accountService: AccountService,
    protected dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getSifraPostupka();
  }

  getSifraPostupka(): void {
    this.isLoading = true;
    this.specifikacijaService
      .query({
        'sifraPostupka.in': this.postupak,
      })
      .subscribe({
        next: (res: HttpResponse<ISpecifikacije[]>) => {
          this.isLoading = false;
          this.dataSource.data = res.body ?? [];
          this.specifikacijes = res;
          this.getTotalProcjenjena();
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }
  sifraPostupkaNull(): void {
    this.sifraPostupka = null;
    this.getSifraPostupka();
  }
  startEdit(
    id?: number,
    sifraPostupka?: number,
    brojPartije?: number,
    atc?: string | null,
    inn?: string | null,
    farmaceutskiOblikLijeka?: string | null,
    jacinaLijeka?: string | null,
    trazenaKolicina?: number,
    pakovanje?: string | null,
    jedinicaMjere?: string | null,
    procijenjenaVrijednost?: number
  ): any {
    const dialogRef = this.dialog.open(SpecifikacijeUpdateComponent, {
      data: {
        id,
        sifraPostupka,
        brojPartije,
        atc,
        inn,
        farmaceutskiOblikLijeka,
        jacinaLijeka,
        trazenaKolicina,
        pakovanje,
        jedinicaMjere,
        procijenjenaVrijednost,
        name: (this.aktivno = true),
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getSifraPostupka(), this.getTotalProcjenjena();
    });
  }

  addNew(): any {
    const dialogRef = this.dialog.open(SpecifikacijeUpdateComponent, {
      data: { Specifikacije: {}, name: (this.aktivno = false) },
    });
    dialogRef.afterClosed().subscribe(() => this.getSifraPostupka());
  }
  deleteItem(i: number, id: number): void {
    this.index = i;
    this.id = id;
    this.dialog.open(SpecifikacijeDeleteDialogComponent, {
      data: { id },
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.getSifraPostupka();
    });
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  getTotalProcjenjena(): any {
    return (this.ukupnaProcijenjena = this.dataSource.filteredData
      .map(t => t.procijenjenaVrijednost)
      .reduce((acc, value) => acc! + value!, 0));
  }
  doFilter = (iznos: string): any => {
    this.dataSource.filter = iznos.trim().toLocaleLowerCase();
    this.ukupnaProcijenjena = this.dataSource.filteredData.map(t => t.procijenjenaVrijednost).reduce((acc, value) => acc! + value!, 0);
  };

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  uploadFile(): any {
    const formData = new FormData();
    formData.append('files', this.fileInput.nativeElement.files[0]);

    this.specifikacijaService.UploadExcel(formData).subscribe((result: { toString: () => string | undefined }) => {
      this.message = result.toString();
      this.getSifraPostupka();
    });
  }

  obrazacExcel(): void {
    window.location.href = `${this.resourceUrlExcelDownload}/${this.brojObrazac}`;
  }
}
