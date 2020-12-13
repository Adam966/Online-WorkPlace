import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {UtilsMessage} from '../../../../shared/utils/utils-message';

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
    this.dialog.close(this.form.value ?? null);
    UtilsMessage.showMessage(UtilsMessage.MESSAGE_WORKPLACE_CREATED, UtilsMessage.MESSAGE_STATUS_POSITIVE);
  }
}
