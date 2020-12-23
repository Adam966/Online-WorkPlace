import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
  @Input()
  file: { name: string, owner: string, type: string, size: number };

  constructor() { }

  ngOnInit(): void {
  }
}
