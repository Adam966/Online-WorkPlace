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
      ...this.form.value, photo: this.file ?? null,
    };

    if (workplace.photo) {
      workplace.backgroundColor = null;
    }
    this.dialog.close(workplace);
  }

  chooseFile(file: File): void {
    this.file = file;
  }
}
