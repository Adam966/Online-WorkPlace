import {WorkplaceElementModel} from './workplaceelement.model';

export class ThreadModel implements WorkplaceElementModel {

  constructor(name: string, description: string, backGroundColor?: string, id?: number) {
    this.backGroundColor = backGroundColor;
    this.id = id;
    this.name = name;
    this.description = description;
  }

  backGroundColor: string;
  id?: number;
  name: string;
  description: string;
}
