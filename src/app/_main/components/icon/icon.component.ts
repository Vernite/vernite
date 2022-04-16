import { Component, HostBinding, Input } from '@angular/core';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import { Utils } from '../../classes/utils.class';
import { faQuestion, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  @Input() size: string = '24px';

  @Input() set icon(value: string | IconDefinition) {
    this._icon = value;

    if (typeof value === 'string') {
      const splitIndex = Utils.regexIndexOf(value, /[A-Z]/);

      this.prefix = value.substring(0, splitIndex) as IconPrefix;
      this.name = value.substring(splitIndex) as IconName;
    } else {
      this.prefix = value.prefix as IconPrefix;
      this.name = value.iconName as IconName;
    }
  }

  @HostBinding('style.width') get width() {
    return this.size;
  }
  @HostBinding('style.height') get height() {
    return this.size;
  }

  public get icon(): string | IconDefinition {
    return this._icon;
  }

  public get iconDefinition(): IconDefinition {
    if (typeof this._icon === 'string') {
      return faQuestion;
    }
    return this._icon as IconDefinition;
  }

  public get style() {
    return {
      'font-size': this.size,
      width: this.size,
      height: this.size,
      'line-height': this.size,
    };
  }

  private _icon: string | IconDefinition = '';

  public prefix: IconPrefix = 'fas';
  public name: IconName = 'question';

  public get snakeCaseName(): IconName {
    return Utils.snakeCase(this.name) as IconName;
  }

  constructor() {}
}
