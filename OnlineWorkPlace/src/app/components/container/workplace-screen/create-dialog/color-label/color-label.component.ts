import {Component, Input, OnInit} from '@angular/core';
import {LabelModel} from '../../../../../models/label.model';

@Component({
  selector: 'app-color-label',
  templateUrl: './color-label.component.html',
  styleUrls: ['./color-label.component.css']
})
export class ColorLabelComponent implements OnInit {
  @Input()
  label: LabelModel;

  constructor() { }

  ngOnInit(): void {
  }

}
