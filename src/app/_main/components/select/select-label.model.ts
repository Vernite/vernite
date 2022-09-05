import { FormControl } from '@ngneat/reactive-forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { OptionComponent } from './option/option.component';

export interface SelectLabel {
  icon?: string | IconDefinition;
  control: FormControl<string>;
  optionComponent?: OptionComponent;
}
