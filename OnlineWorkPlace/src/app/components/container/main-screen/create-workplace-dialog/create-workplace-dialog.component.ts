import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {WorkplaceModel} from '../../../../models/workplace.model';

@Component({
  selector: 'app-create-workplace-dialog',
  templateUrl: './create-workplace-dialog.component.html',
  styleUrls: ['./create-workplace-dialog.component.css']
})
export class CreateWorkplaceDialogComponent implements OnInit {
  @ViewChild('workplaceForm')
  form: NgForm;

  file: File = null;
  constructor(private dialog: MatDialogRef<CreateWorkplaceDialogComponent>) { }

  ngOnInit(): void {
  }

  createWorkplace(): void {
    const workplace: WorkplaceModel = {
      ...this.form.value,
    };

    if (this.file) {
      workplace.backgroundColor = null;
    } else {
      workplace.photo = null;
      workplace.backgroundColor = '#cccac4';
    }
    this.dialog.close({workplace, file: this.file});
  }

  chooseFile(file: File): void {
    this.file = file;
  }
}
