/**
 * Snackbar data interface
 */
export interface SnackbarData {
  /** Snackbar color */
  color: 'gray' | 'green' | 'red' | 'yellow';
  /** Snackbar message */
  message: string;
  /** Snackbar display duration */
  duration: number;
}
