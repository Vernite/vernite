import { Component, Input, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import {
  faQuestion,
  IconDefinition,
  IconName,
  IconPrefix,
} from '@fortawesome/free-solid-svg-icons';
import { snakeCase } from 'lodash-es';

/**
 * Icon component. Supports material icons and font-awesome icons.
 */
@Component({
  selector: 'ui-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UIIconComponent {
  /**
   * Icon size. Defaults to 1rem. Supports all CSS units.
   * For example: 24px, 1.5rem, etc.
   */
  @Input() size: string = '1rem';

  /**
   * Icon to display. Can be a string or an icon definition.
   * For example:
   *
   * For the icon "fa fa-question" you can use:
   * ```html
   * <app-icon [icon]="faQuestion"></app-icon>
   * ```
   *
   * For the icon "mat search" you can use:
   * ```html
   * <app-icon icon="matSearch"></app-icon>
   * ```
   */
  @Input() set icon(value: string | IconDefinition) {
    this._icon = value;

    if (typeof value === 'string') {
      const splitIndex = value.search(/[A-Z]/);

      this.prefix = value.substring(0, splitIndex) as IconPrefix;
      this.name = value.substring(splitIndex) as IconName;
    } else {
      this.prefix = value.prefix;
      this.name = value.iconName;
    }
  }

  /**
   * Icon getter
   */
  public get icon(): string | IconDefinition {
    return this._icon;
  }

  /**
   * Binding to hosts width attribute to use the size input.
   */
  @HostBinding('style.width') get width() {
    return this.size;
  }

  /**
   * Binding to the hosts height attribute to use the size input.
   */
  @HostBinding('style.height') get height() {
    return this.size;
  }

  /**
   * Getter to the icon definition. If no icon is found it returns the question icon.
   */
  public get iconDefinition(): IconDefinition {
    if (typeof this._icon === 'string') {
      return faQuestion;
    }
    return this._icon;
  }

  /**
   * Style host binding to set the icon size.
   */
  public get style() {
    return {
      'font-size': this.size,
      width: this.size,
      height: this.size,
      'line-height': this.size,
    };
  }

  /**
   * Private icon variable to use getter and setter for props.
   */
  private _icon: string | IconDefinition = '';

  /**
   * Prefix getter
   */
  public prefix: IconPrefix = 'fas';

  /**
   * Name getter
   */
  public name: IconName = 'question';

  /**
   * Getter to get the icon name in snake case.
   * For example:
   *
   * for `ShoppingCart` this function will return `shopping_cart`
   */
  public get snakeCaseName(): IconName {
    return snakeCase(this.name) as IconName;
  }
}
