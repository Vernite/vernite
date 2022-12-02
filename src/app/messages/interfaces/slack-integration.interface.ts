import { JSONParsable } from '../../_main/interfaces/json-parsable.interface';

export interface SlackIntegration extends JSONParsable {
  id: number;
  installerUserId: string;
  teamName: string;
}
