import { Loader } from '../../classes/loader/loader.class';

/** Service method options interface to provide some behaviour customization like filters or loaders */
export interface ServiceMethodOptions {
  loader?: Loader;
}
