import { Component, Inject } from '@angular/core';
import { ISpecifikacije } from '../specifikacije.model';
import { SpecifikacijeService } from '../service/specifikacije.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './specifikacije-delete-dialog.component.html',
})
export class SpecifikacijeDeleteDialogComponent {
  specifikacije?: ISpecifikacije;

  constructor(
    public dialogRef: MatDialogRef<SpecifikacijeDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public specifikacijeService: SpecifikacijeService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.specifikacijeService.deleteSpecifikacije(this.data.id);
    // eslint-disable-next-line no-console
    console.log('To je iz delete dialog  ');
  }
}
