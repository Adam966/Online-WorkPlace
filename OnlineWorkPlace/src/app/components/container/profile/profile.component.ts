import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {SetApplicationToolbarState, SetApplicationToolbarTitle} from '../../../store/application';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  image = '';

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  choosePhoto(file: File): void {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      this.image = this.sanitizeUrl(event);
    };
  }

  sanitizeUrl(event: ProgressEvent<FileReader>): any {
    return this.sanitizer.bypassSecurityTrustResourceUrl(event.target.result.toString());
  }

  changeUserPhoto(image: string): void {
    // TODO change user image
  }

  @Dispatch()
  setApplicationTitle(): SetApplicationToolbarTitle {
    return new SetApplicationToolbarTitle('Profile Settings');
  }
}
