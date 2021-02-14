import {WorkplaceElementModel} from './workplaceelement.model';

export interface NoteModel extends WorkplaceElementModel {
  id?: number;
  name: string;
  description: string;
  dueDate?: Date;
}
