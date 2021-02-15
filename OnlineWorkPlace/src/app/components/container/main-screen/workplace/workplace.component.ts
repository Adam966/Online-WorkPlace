import {Component, Input, OnInit} from '@angular/core';
import {WorkplaceModel} from '../../../../models/workplace.model';
import {WORKPLACE_PHOTO} from '../../../../services/url_const';


@Component({
  selector: 'app-workplace',
  templateUrl: './workplace.component.html',
  styleUrls: ['./workplace.component.css']
})
export class WorkplaceComponent implements OnInit {
  @Input()
  workPlace: WorkplaceModel;
  url = '#';

  constructor() {
  }

  ngOnInit(): void {
    if (this.workPlace.photo) {
      this.url = WORKPLACE_PHOTO;
    }
  }

}
