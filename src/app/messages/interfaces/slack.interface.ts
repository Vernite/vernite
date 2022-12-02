import { JSONParsable } from '../../_main/interfaces/json-parsable.interface';

export interface SlackUser extends JSONParsable {
  id: string;
  team: string;
  name: string;
  displayName: string;
  bot: boolean;
  avatar: string;
  provider: string;
}

export interface SlackChannel extends JSONParsable {
  id: string;
  name: string;
  user: string;
  channel: boolean;
  team: string;
  provider: string;
}

export interface SlackIntegration extends JSONParsable {
  id: string;
  installerUserId: string;
  teamName: string;
}
