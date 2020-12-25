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

  files = [];

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
    window.open('http://localhost:4200/document', '_blank');
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
