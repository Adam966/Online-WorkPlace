import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-workplace-element',
  templateUrl: './workplace-element.component.html',
  styleUrls: ['./workplace-element.component.css']
})
export class WorkplaceElementComponent implements OnInit {
  @Input()
  element: { title: string, content: string };
  images: string[] = ['title', 'title', 'title'];
  taskB = false;

  constructor() { }

  ngOnInit(): void {
  }
}
