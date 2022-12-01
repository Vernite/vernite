import { Component, Input } from '@angular/core';
import { color } from '@main/interfaces/color.interface';
import * as Color from 'color';

/**
 * Color component to display a color in square
 */
@Component({
  selector: 'color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
})
export class ColorComponent {
  /**
   * Color to display
   */
  @Input() set color(color: color) {
    this._color = color;
    this._rgb = Color(color).rgb().string();
  }
  get color(): color {
    return this._color;
  }

  /** @ignore */
  private _color: color = 0;

  /** @ignore */
  private _rgb = 'rgb(0, 0, 0)';

  /**
   * RGB color to display
   */
  public get rgb() {
    return this._rgb;
  }
}
