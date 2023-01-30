import { NgControl } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainModule } from '@main/_main.module';
import { Meta, moduleMetadata } from '@storybook/angular';
import { NgModuleMetadata } from '@storybook/angular/dist/ts3.9/client/preview/types';
import { merge } from 'lodash-es';
import { getAllProperties } from '../functions/get-all-properties.function';
import { TestNgControl } from '../../../tests/helpers/ng-control-testing-provider.helper';

/**
 * Extended meta interface to add additional properties
 */
export interface ExtendedMeta extends Meta {
  /** Module metadata */
  metadata?: Partial<NgModuleMetadata>;
  /** Component selector */
  selector: string;
}

/**
 * Default metadata to use in all stories
 */
const DEFAULT_METADATA: Partial<NgModuleMetadata> = {
  imports: [MainModule, BrowserAnimationsModule],
  providers: [
    {
      provide: NgControl,
      useClass: TestNgControl,
    },
  ],
};

/**
 * Properties to ignore in the component
 */
const IGNORED_PROPERTIES = getAllProperties({});

/**
 * Story page config class to create storybook pages
 */
export class StoryPageConfig {
  /**
   * Story extended metadata
   */
  private _meta: ExtendedMeta;

  constructor(meta: ExtendedMeta) {
    this._meta = meta;

    this._meta.decorators = [moduleMetadata(merge({}, DEFAULT_METADATA, this._meta.metadata))];
    this.disableEditingFunctions();
  }

  /**
   * Disable editing functions for the component in the interactive tab
   */
  private disableEditingFunctions() {
    if (!this._meta.argTypes) {
      this._meta.argTypes = {};
    }

    const properties = getAllProperties(this._meta.component.prototype);
    for (const [property, predicate] of properties.map(
      (p) => [p, this.propertyPredicate(p)] as [string, any],
    )) {
      if (typeof this._meta.component.prototype[property] === 'function') {
        switch (predicate) {
          case 'delete':
            this._meta.argTypes[property] = { table: { disable: true } };
            break;
          case 'readonly':
            this._meta.argTypes[property] = { control: false };
            break;
        }
      }
    }
  }

  /**
   * Detect if property should be deleted from docs, readonly or normally displayed with ability to edit
   * @param property property to check
   * @returns predicate to use
   */
  private propertyPredicate(property: string) {
    if (property[0] === '_') return 'delete';
    if (property.startsWith('ng')) return 'delete';
    return !IGNORED_PROPERTIES.includes(property) ? 'readonly' : null;
  }

  /**
   * Set title of the story
   * @param title title to set
   * @returns this
   */
  public setTitle(title: string) {
    this._meta.title = title;
    return this;
  }

  /**
   * Add decorators to the story
   * @param decorators decorators to add
   * @returns this
   */
  public addDecorators(decorators: Meta['decorators']) {
    if (!this._meta.decorators) {
      this._meta.decorators = [];
    }

    this._meta.decorators = ([] as any[]).concat(this._meta.decorators, decorators);
    return this;
  }

  /**
   * Selector from the component
   */
  public get selector() {
    return this._meta.selector;
  }

  /**
   * Get storybook meta
   * @returns storybook meta
   */
  public meta() {
    return this._meta as Meta;
  }
}
