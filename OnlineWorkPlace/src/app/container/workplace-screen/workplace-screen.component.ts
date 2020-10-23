import { Component, OnInit } from '@angular/core';
import {WorkplaceElementModel} from '../../models/workplacemodels/workplaceelement.model';
import {WorkplaceElementApiService} from './service/workplace-element-api.service';

@Component({
  selector: 'app-workplace-screen',
  templateUrl: './workplace-screen.component.html',
  styleUrls: ['./workplace-screen.component.css']
})
export class WorkplaceScreenComponent implements OnInit {
  workPlaceElements: WorkplaceElementModel[];
  constructor(private elementApiService: WorkplaceElementApiService) { }

  ngOnInit(): void {
    this.elementApiService.getWorkPlaceElements(1)
      .subscribe(response => {
        this.workPlaceElements = response;
      });
  }
}
