import { Component, Inject } from '@angular/core';
import { IPonude } from '../ponude.model';
import { PonudeService } from '../service/ponude.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './ponude-delete-dialog.component.html',
})
export class PonudeDeleteDialogComponent {
  ponude?: IPonude;

  constructor(
    public dialogRef: MatDialogRef<PonudeDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public ponudeService: PonudeService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.ponudeService.deletePonuda(this.data.id);
  }
}
