import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create-workplace-dialog',
  templateUrl: './create-workplace-dialog.component.html',
  styleUrls: ['./create-workplace-dialog.component.css']
})
export class CreateWorkplaceDialogComponent implements OnInit {
  @ViewChild('workplaceForm')
  form: NgForm;

  constructor(private dialog: MatDialogRef<CreateWorkplaceDialogComponent>) { }

  ngOnInit(): void {
  }

  createWorkplace(): void {
    this.dialog.close(this.form.valid ? this.form.value : null);
  }
}
