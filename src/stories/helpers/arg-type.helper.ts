import { ControlType } from './control-type.helper';
import {
  faQuestion,
  faPenToSquare,
  faTrashArrowUp,
  faAdd,
} from '@fortawesome/free-solid-svg-icons';

const none = null;
const icons = { none, faQuestion, faPenToSquare, faTrashArrowUp, faAdd };

export const DOCS_ICON_SELECT = {
  control: {
    type: 'select',
  },
  options: Object.keys(icons),
  mapping: icons,
};

export const DOCS_READONLY = {
  control: false,
};

export const DOCS_REMOVE = {
  table: {
    disable: true,
  },
};

export const DOCS_CONTROL = (controlType: ControlType) => ({
  control: {
    type: controlType,
  },
});

export const DOCS_GETTER = (description: string) => ({
  control: {
    type: false,
  },
  table: {
    category: 'getters',
  },
  description,
});

// Simple controls
export const DOCS_SELECT = {
  control: {
    type: 'select',
  },
};

export const DOCS_PRESET_CONTROL_ACCESSOR = {
  ngControl: DOCS_READONLY,
  required: {
    control: { type: false },
    table: { category: 'getters', type: { summary: 'boolean' } },
    description: `Property to describe if the control is required in a form (contains \`requiredValidator()\`)`,
    type: { name: 'boolean' },
  },
  control: {
    control: { type: false },
    table: { category: 'getters', type: { summary: 'FormControl' } },
    description: `Control attached to this control accessor`,
    type: { name: 'FormControl' },
  },
  formControl: {
    control: { type: false },
    table: { category: 'inputs', type: { summary: 'FormControl' } },
    description: `Control to attach to this control accessor (\`formControlName\` can also be used instead)`,
    type: { name: 'FormControl' },
  },
  formControlName: {
    control: { type: false },
    table: { category: 'inputs', type: { summary: 'string' } },
    description: `Control to attach to this control accessor - require to be nested in \`formGroup\` (\`formControl\` can also be used instead)`,
    type: { name: 'string' },
  },
};
