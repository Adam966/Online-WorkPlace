import {Component, Inject, OnInit} from '@angular/core';
import {WorkplaceSettingsApiService} from '../../../../../services/workplace-settings-api/workplace-settings-api.service';
import {LabelModel} from '../../../../../models/label.model';

@Component({
  selector: 'app-add-label',
  templateUrl: './add-label.component.html',
  styleUrls: ['./add-label.component.css']
})
export class AddLabelComponent implements OnInit {
  constructor(private workplaceSettingsService: WorkplaceSettingsApiService) { }

  ngOnInit(): void {
  }

  create(name: string, color: string): void {
    this.workplaceSettingsService.addWorkplaceLabel(1, new LabelModel(name, color));
  }
}
