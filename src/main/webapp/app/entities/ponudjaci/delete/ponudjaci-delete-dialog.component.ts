import { Component, Inject } from '@angular/core';
import { IPonudjaci } from '../ponudjaci.model';
import { PonudjaciService } from '../service/ponudjaci.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './ponudjaci-delete-dialog.component.html',
})
export class PonudjaciDeleteDialogComponent {
  ponudjaci?: IPonudjaci;

  constructor(
    public dialogRef: MatDialogRef<PonudjaciDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public ponudjaciiService: PonudjaciService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.ponudjaciiService.deletePonudjac(this.data.id);
    // eslint-disable-next-line no-console
    console.log('To je iz delete dialog  ');
  }
}
