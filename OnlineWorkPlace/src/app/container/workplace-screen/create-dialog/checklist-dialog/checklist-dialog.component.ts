import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checklist-dialog',
  templateUrl: './checklist-dialog.component.html',
  styleUrls: ['./checklist-dialog.component.css']
})
export class ChecklistDialogComponent implements OnInit {
  tasks: string[] = ['string', 'string', 'string'];

  constructor() { }

  ngOnInit(): void {
  }

}
