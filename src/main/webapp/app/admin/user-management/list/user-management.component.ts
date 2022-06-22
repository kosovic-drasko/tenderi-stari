import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITEMS_PER_PAGE } from 'app/config/pagination.constants';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { UserManagementService } from '../service/user-management.service';
import { IUser, User } from '../user-management.model';
import { UserManagementDeleteDialogComponent } from '../delete/user-management-delete-dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserManagementUpdateComponent } from '../update/user-management-update.component';

@Component({
  selector: 'jhi-user-mgmt',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-managment.scss'],
})
export class UserManagementComponent implements OnInit {
  currentAccount: Account | null = null;
  users: User[] | null = null;
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  aktivno?: boolean;
  id?: number;
  index?: number;
  public displayedColumns = ['login', 'first_name', 'last_name', 'email', 'acivated', 'created_by', 'edit', 'delete'];

  public dataSource = new MatTableDataSource<IUser>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() postupak?: any;
  constructor(
    private userService: UserManagementService,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }
  reloadCurrentRoute(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  startEdit(
    id?: number,
    login?: number,
    firstName?: string | null,
    lastName?: string,
    email?: string,
    acivated?: boolean,
    createdBy?: string
  ): any {
    const dialogRef = this.dialog.open(UserManagementUpdateComponent, {
      data: {
        id,
        login,
        firstName,
        lastName,
        email,
        acivated,
        createdBy,
        name: (this.aktivno = true),
      },
    });
    dialogRef.afterClosed().subscribe(() => this.reloadCurrentRoute());
  }

  addNew(): any {
    const dialogRef = this.dialog.open(UserManagementUpdateComponent, {
      data: { User: {}, name: (this.aktivno = false) },
    });
    dialogRef.afterClosed().subscribe(() => this.reloadCurrentRoute());
  }
  setActive(user: User, isActivated: boolean): void {
    this.userService.update({ ...user, activated: isActivated }).subscribe(() => this.loadAll());
  }

  trackIdentity(_index: number, item: User): number {
    return item.id!;
  }

  deleteUser(user: User[]): void {
    const modalRef = this.modalService.open(UserManagementDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.user = user;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }

  loadAll(): void {
    this.isLoading = true;
    this.userService.query().subscribe({
      next: (res: HttpResponse<User[]>) => {
        this.isLoading = false;
        this.dataSource.data = res.body ?? [];
        // this.onSuccess(res.body, res.headers);
      },
      error: () => (this.isLoading = false),
    });
  }
  deleteItem(i: number, id: number): void {
    this.index = i;
    this.id = id;
    this.dialog.open(UserManagementDeleteDialogComponent, {
      data: { id },
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.reloadCurrentRoute();
    });
  }
  // private onSuccess(users: User[] | null, headers: HttpHeaders): void {
  //   this.totalItems = Number(headers.get('X-Total-Count'));
  //   this.users = users;
  // }
}
