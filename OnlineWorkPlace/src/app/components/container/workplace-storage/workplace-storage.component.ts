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
    { name: 'file 2', owner: 'Adam Ivan', type: 'doc', size: 48 },
    { name: 'file 3', owner: 'Adam Ivan', type: 'doc', size: 48 },
    { name: 'file 4', owner: 'Adam Ivan', type: 'doc', size: 48 },
    { name: 'file 5', owner: 'Adam Ivan', type: 'doc', size: 48 },
    { name: 'file 6', owner: 'Adam Ivan', type: 'doc', size: 48 },
    { name: 'file 7', owner: 'Adam Ivan', type: 'doc', size: 48 },
    { name: 'file 8', owner: 'Adam Ivan', type: 'doc', size: 48 },
    { name: 'file 9', owner: 'Adam Ivan', type: 'doc', size: 48 },
    { name: 'file 10', owner: 'Adam Ivan', type: 'doc', size: 48 },
    { name: 'file 11', owner: 'Adam Ivan', type: 'doc', size: 48 },
    { name: 'file 12', owner: 'Adam Ivan', type: 'doc', size: 48 },
    { name: 'file 13', owner: 'Adam Ivan', type: 'doc', size: 48 },
    { name: 'file 14', owner: 'Adam Ivan', type: 'doc', size: 48 },
    { name: 'file 15', owner: 'Adam Ivan', type: 'doc', size: 48 },
    { name: 'file 16', owner: 'Adam Ivan', type: 'doc', size: 48 },
    { name: 'file 17', owner: 'Adam Ivan', type: 'doc', size: 48 },
    { name: 'file 18', owner: 'Adam Ivan', type: 'doc', size: 48 },
    { name: 'file 19', owner: 'Adam Ivan', type: 'doc', size: 48 },
    { name: 'file 20', owner: 'Adam Ivan', type: 'doc', size: 48 },
  ];

  displayedColumns = ['name', 'owner', 'type', 'size', 'download', 'remove'];
  file: File = null;

  constructor() { }

  ngOnInit(): void {
    this.changeToolbarStatus();
  }

  @Dispatch()
  changeToolbarStatus(): SetApplicationToolbarState {
    return new SetApplicationToolbarState(true);
  }

  chooseFile(file: File): void {
    this.file = file;
  }

  uploadFile(): void {
    // TODO add storage upload service
  }

  showFile(index: any): void  {
    console.log(index);
  }

  downloadFile(file: File): void {
    console.log(file);
  }

  removeFile(file: File): void {
    console.log(file);
  }
}
