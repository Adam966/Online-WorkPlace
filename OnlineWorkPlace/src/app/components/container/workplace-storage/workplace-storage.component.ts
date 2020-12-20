import { Component, OnInit } from '@angular/core';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {SetApplicationToolbarState} from '../../../store/application';

@Component({
  selector: 'app-workplace-storage',
  templateUrl: './workplace-storage.component.html',
  styleUrls: ['./workplace-storage.component.css']
})
export class WorkplaceStorageComponent implements OnInit {
  files = [
    { name: 'file 1', owner: 'Adam Ivan', type: 'doc', size: 48 },
    { name: 'file 1', owner: 'Adam Ivan', type: 'doc', size: 48 },
    { name: 'file 1', owner: 'Adam Ivan', type: 'doc', size: 48 },
    { name: 'file 1', owner: 'Adam Ivan', type: 'doc', size: 48 },
    { name: 'file 1', owner: 'Adam Ivan', type: 'doc', size: 48 },
  ];

  displayedColumns = ['name', 'owner', 'type', 'size', 'download', 'remove'];

  constructor() { }

  ngOnInit(): void {
    this.changeToolbarStatus();
  }

  @Dispatch()
  changeToolbarStatus(): SetApplicationToolbarState {
    return new SetApplicationToolbarState(true);
  }
}
