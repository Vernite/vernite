import { ControlType } from './control-type.helper';
import {
  faQuestion,
  faPenToSquare,
  faTrashArrowUp,
  faAdd,
} from '@fortawesome/free-solid-svg-icons';

/** icons dictionary to use in icon select */
const icons = { none: null, faQuestion, faPenToSquare, faTrashArrowUp, faAdd };

/** Icon select to use in interactive interaction */
export const DOCS_ICON_SELECT = {
  control: {
    type: 'select',
  },
  options: Object.keys(icons),
  mapping: icons,
};

/** Documentation readonly property decorator */
export const DOCS_READONLY = {
  control: false,
};

/** Documentation remove property decorator (to not display in properties table - actually use @ignore) */
export const DOCS_REMOVE = {
  table: {
    disable: true,
  },
};

/** Documentation control property decorator */
export const DOCS_CONTROL = (controlType: ControlType) => ({
  control: {
    type: controlType,
  },
});

/** Documentation getter property decorator */
export const DOCS_GETTER = (description: string) => ({
  control: {
    type: false,
  },
  table: {
    category: 'getters',
  },
  description,
});

/** Documentation select property decorator */
export const DOCS_SELECT = {
  control: {
    type: 'select',
  },
};

/** Documentation ControlAccessor component properties preset */
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
