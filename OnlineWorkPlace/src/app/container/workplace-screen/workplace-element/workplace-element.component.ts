import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-workplace-element',
  templateUrl: './workplace-element.component.html',
  styleUrls: ['./workplace-element.component.css']
})
export class WorkplaceElementComponent implements OnInit {
  @Input()
  element: { title: string, content: string };
  constructor() { }

  ngOnInit(): void {
  }

}
