export interface Task {
  id: number;
  name: string;
  description: string;

  /**
   * Returned by the server using GET methods.
   */
  statusId?: number;

  /**
   * Sent to the server using PUT and POST methods.
   */
  status?: number;
}
