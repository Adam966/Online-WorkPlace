import {Component, Input, OnInit} from '@angular/core';
import {WorkplaceModel} from '../../../../models/workplace.model';

@Component({
  selector: 'app-workplace',
  templateUrl: './workplace.component.html',
  styleUrls: ['./workplace.component.css']
})
export class WorkplaceComponent implements OnInit {
  @Input()
  workPlace: WorkplaceModel;

  constructor() { }

  ngOnInit(): void {
  }

}
