import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-create-workplace-dialog',
  templateUrl: './create-workplace-dialog.component.html',
  styleUrls: ['./create-workplace-dialog.component.css']
})
export class CreateWorkplaceDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  createWorkplace(workplaceForm: NgForm): void {
    console.log(workplaceForm);
  }
}
