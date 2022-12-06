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
  name?: string;
  user?: string;
  channel: boolean;
  team: string;
  provider: string;
}

export interface SlackChannelWithUser extends Omit<SlackChannel, 'user'> {
  user?: SlackUser;
}

export interface SlackIntegration extends JSONParsable {
  id: number;
  installerUserId: string;
  teamName: string;
}

export interface SlackIntegrationWithChannels extends SlackIntegration {
  channels: SlackChannel[];
}

export interface SlackIntegrationWithChannelsAndUsers extends SlackIntegration {
  channels: SlackChannelWithUser[];
}

export interface SlackTree extends JSONParsable {
  id: string;
  installerUserId: string;
  teamName: string;
  channels: (SlackChannel & {
    userObject?: SlackUser;
  })[];
}
