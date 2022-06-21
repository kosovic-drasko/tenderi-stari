import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPostupci } from '../postupci.model';
import { PostupciService } from '../service/postupci.service';
import { PostupciDeleteDialogComponent } from '../delete/postupci-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { PostupciUpdateComponent } from '../update/postupci-update.component';

@Component({
  selector: 'jhi-postupci',
  templateUrl: './postupci.component.html',
  styleUrls: ['./postupci.scss'],
})
export class PostupciComponent implements OnInit, AfterViewInit {
  postupaks?: IPostupci[];
  aktivno?: boolean;
  id?: number;
  index?: number;
  public displayedColumns = [
    'sifra postupka',
    'opis postupka',
    'vrsta postupka',
    'datum objave',
    'datum otvaranja',
    'broj tendera',
    'kriterijum cijena',
    'drugi kriterijum',
    'delete',
    'edit',
  ];
  public dataSource = new MatTableDataSource<IPostupci>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    protected postupciService: PostupciService,
    protected modalService: NgbModal,
    public dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  loadAll(): void {
    this.postupciService.query().subscribe((res: HttpResponse<IPostupci[]>) => {
      this.dataSource.data = res.body ?? [];
    });
  }
  startEdit(
    id?: number,
    sifraPostupka?: number,
    brojTendera?: string | null,
    opisPostupka?: string,
    vrstaPostupka?: string,
    datumObjave?: Date,
    datumOtvaranja?: Date,
    kriterijumCijena?: number,
    drugiKriterijum?: number
  ): any {
    const dialogRef = this.dialog.open(PostupciUpdateComponent, {
      data: {
        id,
        sifraPostupka,
        brojTendera,
        opisPostupka,
        vrstaPostupka,
        datumObjave,
        datumOtvaranja,
        kriterijumCijena,
        drugiKriterijum,
        name: (this.aktivno = true),
      },
    });
    dialogRef.afterClosed().subscribe(() => this.loadAll());
  }

  addNew(): any {
    const dialogRef = this.dialog.open(PostupciUpdateComponent, {
      data: { Postupci: {}, name: (this.aktivno = false) },
    });
    dialogRef.afterClosed().subscribe(() => this.loadAll());
  }

  deleteItem(i: number, id: number): void {
    this.index = i;
    this.id = id;
    this.dialog.open(PostupciDeleteDialogComponent, {
      data: { id },
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.loadAll();
    });
  }

  ngOnInit(): void {
    this.loadAll();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
