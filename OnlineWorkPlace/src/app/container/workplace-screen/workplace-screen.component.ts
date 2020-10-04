import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workplace-screen',
  templateUrl: './workplace-screen.component.html',
  styleUrls: ['./workplace-screen.component.css']
})
export class WorkplaceScreenComponent implements OnInit {
  workPlaceElements = ['test', 'test', 'test', 'test', 'test', 'test', 'test', 'test'];
  constructor() { }

  ngOnInit(): void {
  }

}
