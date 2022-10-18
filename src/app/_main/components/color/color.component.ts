import { Component, Input } from '@angular/core';
import { color } from '@main/interfaces/color.interface';
import * as Color from 'color';

@Component({
  selector: 'color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
})
export class ColorComponent {
  @Input() set color(color: color) {
    this._color = color;
    this.rgbColor = Color(color).rgb().string();
  }
  get color(): color {
    return this._color;
  }
  private _color: color = 0;

  public rgbColor = 'rgb(0, 0, 0)';
}
