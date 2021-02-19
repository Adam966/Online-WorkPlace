import {Component, OnInit} from '@angular/core';
import {WorkplaceSettingsApiService} from '../../../../../services/workplace-settings-api/workplace-settings-api.service';
import {LabelModel} from '../../../../../models/application-models/label.model';
import {Select} from '@ngxs/store';
import {ApplicationState} from '../../../../../store/application';
import {Observable} from 'rxjs';
import {Dispatch} from '@ngxs-labs/dispatch-decorator';
import {AddWorkplaceLabel} from '../../../../../store/workplace-settings';
import {UtilsMessage} from '../../../../../shared/utils/utils-message';

@Component({
  selector: 'app-add-label',
  templateUrl: './add-label.component.html',
  styleUrls: ['./add-label.component.css']
})
export class AddLabelComponent implements OnInit {
  constructor(private workplaceSettingsService: WorkplaceSettingsApiService) {
  }

  @Select(ApplicationState.currentWorkplaceId)
  workplaceId$: Observable<string>;
  workplaceId: string;

  ngOnInit(): void {
    this.workplaceId$.subscribe(data => this.workplaceId = data);
  }

  create(name: string, color: string): void {
    this.workplaceSettingsService.addWorkplaceLabel(new LabelModel(name, color), this.workplaceId)
      .subscribe(label => {
        this.addWorkplaceLabel(label);
        UtilsMessage.showMessage(UtilsMessage.MESSAGE_LABEL_CREATED, UtilsMessage.MESSAGE_STATUS_POSITIVE);
      });
  }

  @Dispatch()
  addWorkplaceLabel(label: LabelModel): AddWorkplaceLabel {
    return new AddWorkplaceLabel(label);
  }
}
