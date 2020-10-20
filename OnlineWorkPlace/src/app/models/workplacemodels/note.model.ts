import {WorkplaceElementModel} from './workplaceelement.model';

export class NoteModel implements WorkplaceElementModel{
  backGroundColor: string;
  id: number;
  name: string;
  description: string;
  dueDate: Date;
}
