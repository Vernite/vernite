import { FormControl } from '@ngneat/reactive-forms';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { OptionComponent } from './option/option.component';

export interface Selection {
  icon?: string | IconDefinition;
  control: FormControl<string>;
  options?: OptionComponent[];
}
