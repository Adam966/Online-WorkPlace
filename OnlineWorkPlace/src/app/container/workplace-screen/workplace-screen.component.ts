import { Component, OnInit } from '@angular/core';
import {WorkplaceElementModel} from '../../models/workplacemodels/workplaceelement.model';
import {WorkplaceElementApiService} from './service/workplace-element-api.service';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {GetWorkplacesElements, WorkplaceElementState} from '../../store/workplace-element';

@Component({
  selector: 'app-workplace-screen',
  templateUrl: './workplace-screen.component.html',
  styleUrls: ['./workplace-screen.component.css']
})
export class WorkplaceScreenComponent implements OnInit {
  @Select(WorkplaceElementState)
  workPlaceElements$: Observable<WorkplaceElementModel[]>;
  constructor(private elementApiService: WorkplaceElementApiService, private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(new GetWorkplacesElements(1));
  }
}
