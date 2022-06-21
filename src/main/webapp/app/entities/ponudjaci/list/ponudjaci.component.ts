import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IPonudjaci } from '../ponudjaci.model';
import { PonudjaciService } from '../service/ponudjaci.service';
import { PonudjaciDeleteDialogComponent } from '../delete/ponudjaci-delete-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Account } from '../../../core/auth/account.model';
import { PonudjaciUpdateComponent } from '../update/ponudjaci-update.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from '../../../core/auth/account.service';

@Component({
  selector: 'jhi-ponudjaci',
  templateUrl: './ponudjaci.component.html',
  styleUrls: ['./ponudjaci.scss'],
})
export class PonudjaciComponent implements AfterViewInit, OnInit {
  ponudjacis?: HttpResponse<IPonudjaci[]>;
  account: Account | null = null;
  authSubscription?: Subscription;
  aktivno?: boolean;
  id?: number;
  index?: number;
  public displayedColumns = ['id', 'naziv ponudjaca', 'odgovorno lice', 'adresa ponudjaca', 'banka racun', 'delete', 'edit'];

  public dataSource = new MatTableDataSource<IPonudjaci>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    protected ponudjaciService: PonudjaciService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: NgbModal,
    private accountService: AccountService,
    public dialog: MatDialog
  ) {}

  loadAll(): void {
    this.ponudjaciService.query().subscribe((res: HttpResponse<IPonudjaci[]>) => {
      this.dataSource.data = res.body ?? [];
      this.ponudjacis = res;
    });
  }

  previousState(): void {
    window.history.back();
  }

  delete(ponudjaci: IPonudjaci[]): void {
    const modalRef = this.modalService.open(PonudjaciDeleteDialogComponent, { backdrop: 'static' });
    modalRef.componentInstance.ponudjaci = ponudjaci;

    modalRef.closed.subscribe((reason: string) => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  ngOnInit(): void {
    this.loadAll();
  }

  startEdit(id?: number, nazivPonudjaca?: string, odgovornoLice?: string | null, adresaPonudjaca?: string, bankaRacun?: string): any {
    const dialogRef = this.dialog.open(PonudjaciUpdateComponent, {
      data: {
        id,
        nazivPonudjaca,
        odgovornoLice,
        adresaPonudjaca,
        bankaRacun,
        name: (this.aktivno = true),
      },
    });
    dialogRef.afterClosed().subscribe(() => this.loadAll());
  }

  addNew(): any {
    const dialogRef = this.dialog.open(PonudjaciUpdateComponent, {
      data: { Ponudjaci: {}, name: (this.aktivno = false) },
    });
    dialogRef.afterClosed().subscribe(() => this.loadAll());
  }

  deleteItem(i: number, id: number): void {
    this.index = i;
    this.id = id;
    this.dialog.open(PonudjaciDeleteDialogComponent, {
      data: { id },
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.loadAll();
    });
  }
}
