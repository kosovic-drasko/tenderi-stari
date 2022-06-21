import { Component, Inject } from '@angular/core';
import { IPostupci } from '../postupci.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostupciService } from '../service/postupci.service';

@Component({
  templateUrl: './postupci-delete-dialog.component.html',
})
export class PostupciDeleteDialogComponent {
  postupci?: IPostupci;

  constructor(
    public dialogRef: MatDialogRef<PostupciDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public postupciService: PostupciService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.postupciService.deletePostupak(this.data.id);
    // eslint-disable-next-line no-console
    console.log('To je iz delete dialog  ');
  }
}
