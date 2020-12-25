import {Component, OnInit, ViewChild} from '@angular/core';
import {MatMenuTrigger} from '@angular/material/menu';
import {StorageApiService} from '../../../services/storage-qpi/storage-api.service';
import {Select} from '@ngxs/store';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-workplace-storage',
  templateUrl: './workplace-storage.component.html',
  styleUrls: ['./workplace-storage.component.css']
})
export class WorkplaceStorageComponent implements OnInit {
  @ViewChild(MatMenuTrigger)
  menu: MatMenuTrigger;

  @Select()
  workplaceId$: Observable<string>;
  workplaceId: string;

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

  menuPosition: {x: string, y: string} = {x: `0px`, y: `0px`};
  displayedColumns = ['name', 'owner', 'type', 'size', 'download', 'remove'];
  file: File = null;
  fileIndex = 0;

  constructor(private storageApiService: StorageApiService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.files = this.activeRoute.snapshot.data.storageFiles;
  }

  chooseFile(file: File): void {
    this.file = file;
  }

  uploadFile(): void {
    // TODO add storage upload service
  }

  showFile(index: number): void  {
    // TODO show file
    console.log(index);
  }

  downloadFile(): void {
    // TODO download file
    console.log('Download file' + this.fileIndex);
  }

  removeFile(): void {
    // TODO remove file
    this.files.splice(this.fileIndex, 1);
  }

  showMenu(event: MouseEvent, index: number): void {
    event.preventDefault();
    this.fileIndex = index;
    this.menuPosition = {x: `${event.x}px`, y: `${event.y}px`};
    this.menu.openMenu();
  }
}
