import { NgControl } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainModule } from '@main/_main.module';
import { Meta, moduleMetadata } from '@storybook/angular';
import { NgModuleMetadata } from '@storybook/angular/dist/ts3.9/client/preview/types';
import { merge } from 'lodash-es';
import { getAllProperties } from '../functions/get-all-properties.function';

export interface ExtendedMeta extends Meta {
  metadata?: Partial<NgModuleMetadata>;
  selector: string;
}

const DEFAULT_METADATA: Partial<NgModuleMetadata> = {
  imports: [MainModule, BrowserAnimationsModule],
  providers: [NgControl],
};

const IGNORED_PROPERTIES = getAllProperties({});

export class StoryPageConfig {
  private _meta: ExtendedMeta;

  constructor(meta: ExtendedMeta) {
    this._meta = meta;

    this._meta.decorators = [moduleMetadata(merge({}, DEFAULT_METADATA, this._meta.metadata))];
    this.disableEditingFunctions();
  }

  private disableEditingFunctions() {
    if (!this._meta.argTypes) {
      this._meta.argTypes = {};
    }

    const properties = getAllProperties(this._meta.component.prototype);
    console.log(properties);
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

  private propertyPredicate(property: string) {
    if (property[0] === '_') return 'delete';
    if (property.startsWith('ng')) return 'delete';
    return !IGNORED_PROPERTIES.includes(property) ? 'readonly' : null;
  }

  public setTitle(title: string) {
    this._meta.title = title;
    return this;
  }

  public addDecorators(decorators: Meta['decorators']) {
    if (!this._meta.decorators) {
      this._meta.decorators = [];
    }

    this._meta.decorators = ([] as any[]).concat(this._meta.decorators, decorators);
    return this;
  }

  public get selector() {
    return this._meta.selector;
  }

  public meta() {
    return this._meta as Meta;
  }
}
