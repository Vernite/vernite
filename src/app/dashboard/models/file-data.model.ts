export class FileData extends FormData {
  public name: string;
  public size: number;
  public type: string;

  constructor(file: File) {
    super();

    this.name = file.name;
    this.size = file.size;
    this.type = file.type;
  }
}
