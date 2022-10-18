import { Component } from '@angular/core';
import { ControlAccessor } from '@main/classes/control-accessor.class';
import { color } from '@main/interfaces/color.interface';
import { FormControl } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import * as Color from 'color';
import { filter } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'input-color',
  templateUrl: './input-color.component.html',
  styleUrls: ['./input-color.component.scss'],
})
export class InputColorComponent extends ControlAccessor<color> {
  public userControl = new FormControl<string>('');
  public colorRGB = 'rgb(0, 0, 0)';

  private colorObject!: Color;

  override ngAfterControlInit(): void {
    if (this.control.value) {
      this.colorObject = Color(this.control.value);
      this.userControl.patchValue(this.colorObject.rgb().string());
    } else {
      this.colorObject = Color('#000000');
      this.userControl.patchValue(this.colorObject.rgb().string());
    }

    let changesFromInside = false;
    this.control.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
      console.log('parsing from:', value);
      const color = Color(value);
      this.colorRGB = color.rgb().string();
    });
    this.control.valueChanges
      .pipe(
        untilDestroyed(this),
        filter(() => !changesFromInside),
      )
      .subscribe((value) => {
        console.log('parsing from:', value);
        const color = Color(value);
        this.colorRGB = color.rgb().string();
        this.userControl.setValue(color.toString(), { emitEvent: false });
      });
    this.userControl.valueChanges.pipe(untilDestroyed(this)).subscribe((value) => {
      console.log('parsing from userInput:', value);
      if (value) {
        try {
          const color = Color(value);
          console.log(color);
          changesFromInside = true;
          this.control.setValue(color.rgbNumber());
          changesFromInside = false;
        } catch (e) {
          // Unable to convert to color - give user an error
          console.log(e);
        }
      }
    });
  }
}
