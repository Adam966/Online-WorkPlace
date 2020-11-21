export class LabelModel {
  constructor(name: string, color: string, id?: number) {
    this.id = id;
    this.name = name;
    this.color = color;
  }

  id?: number;
  name: string;
  color: string;
}
