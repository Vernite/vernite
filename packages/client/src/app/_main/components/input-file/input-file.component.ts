import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { faClose, faFile } from '@fortawesome/free-solid-svg-icons';
import { ControlAccessor } from '@main/classes/control-accessor/control-accessor.class';
import { FormControl } from '@ngneat/reactive-forms';

@Component({
  selector: 'input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
})
export class InputFileComponent extends ControlAccessor<File | undefined> {
  @Input() floatingLabel?: string;
  @Input() staticLabel?: string;

  @Input() accept?: string;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  labelControl = new FormControl();

  /** @ignore */
  faFile = faFile;

  /** @ignore */
  faClose = faClose;

  onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;

    if (!inputElement) return;

    const files = inputElement.files;
    if (files && files.length) {
      const file = files[0];
      this.control?.setValue(file);
      this.labelControl.setValue(file.name);
    }
  }

  onClick() {
    this.fileInput.nativeElement.click();
  }

  clear() {
    this.fileInput.nativeElement.value = '';
    this.control?.setValue(undefined);
  }

  override writeValue(value: File | undefined): void {
    super.writeValue(value);

    if (value) {
      this.labelControl.setValue('Uploaded file');
    } else {
      this.labelControl.setValue('');
    }
  }
}
