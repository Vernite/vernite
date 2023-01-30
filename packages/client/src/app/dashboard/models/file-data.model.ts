/**
 * FileData model to represent file send by user
 */
export class FileData extends FormData {
  /** Name of the file */
  public name: string;

  /** Size of the file */
  public size: number;

  /** Type of the file */
  public type: string;

  constructor(file: File) {
    super();

    this.name = file.name;
    this.size = file.size;
    this.type = file.type;
  }
}
