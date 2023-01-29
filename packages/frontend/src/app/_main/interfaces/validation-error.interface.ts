/**
 * Validation error interface. Used with form controls to specify what validators returned errors.
 */
export interface ValidationError {
  /**
   * Type of the error. For example 'required', 'minlength', 'maxlength', 'pattern', 'email', etc.
   */
  type: string;
  /**
   * Human readable error message.
   */
  message: string;
}
