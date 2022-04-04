import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-spinner',
  templateUrl: './dialog-spinner.component.html',
  styleUrls: ['./dialog-spinner.component.scss']
})
export class DialogSpinnerComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef <DialogSpinnerComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit(): void { }

  closeModal(){
    this.dialogRef.close();
  }
}
