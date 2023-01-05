import { Meta } from '@storybook/angular';
import { merge } from 'lodash-es';
import { DOCS_PRESET_CONTROL_ACCESSOR } from '../arg-type.helper';
import { ExtendedMeta, StoryPageConfig } from './story-page-config.class';

/**
 * Default config meta for FormControl to use in all stories
 */
const DEFAULT_CONFIG: Partial<ExtendedMeta> = {
  argTypes: {
    ...DOCS_PRESET_CONTROL_ACCESSOR,
  },
} as Meta;

/**
 * Default config for FormControl to use in all stories
 */
export class FormControlStoryPageConfig extends StoryPageConfig {
  constructor(meta: ExtendedMeta) {
    super(merge({}, DEFAULT_CONFIG, meta));
  }
}
