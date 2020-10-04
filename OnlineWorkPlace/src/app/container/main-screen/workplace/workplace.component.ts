import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-workplace',
  templateUrl: './workplace.component.html',
  styleUrls: ['./workplace.component.css']
})
export class WorkplaceComponent implements OnInit {
  @Input()
  workPlace: {name: string, description: string};

  constructor() { }

  ngOnInit(): void {
  }

}
