import {WorkplaceElementModel} from './workplaceelement.model';

export class NoteModel implements WorkplaceElementModel{
  constructor( name: string, description: string, backGroundColor?: string, dueDate?: Date, id?: number) {
    this.backGroundColor = backGroundColor;
    this.id = id;
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
  }

  backGroundColor: string;
  id?: number;
  name: string;
  description: string;
  dueDate?: Date;
}
