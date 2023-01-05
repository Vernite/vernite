import { JSONParsable } from '../../_main/interfaces/json-parsable.interface';

/** Interface to represent Slack user */
export interface SlackUser extends JSONParsable {
  /** Id of the user */
  id: string;

  /** The team user is member of */
  team: string;

  /** Name of the user */
  name: string;

  /** Display name of the user */
  displayName: string;

  /** State if user is bot */
  bot: boolean;

  /** Avatar of the user */
  avatar: string;

  /** Provider of the user */
  provider: string;
}

/** Interface to represent Slack channel */
export interface SlackChannel extends JSONParsable {
  /** Id of the channel */
  id: string;

  /** Name of the channel */
  name?: string;

  /** Id of the user the slack channel is with */
  user?: string;

  /** Channel name */
  channel: boolean;

  /** The team the channel is member of */
  team: string;

  /** Provider of the channel (`slack` in most cases) */
  provider: string;
}

/** Interface to represent Slack channel with user */
export interface SlackChannelWithUser extends Omit<SlackChannel, 'user'> {
  /** The user the slack channel is with */
  user?: SlackUser;
}

/** Interface to represent Slack integration */
export interface SlackIntegration extends JSONParsable {
  /** Id of the integration */
  id: number;
  /** Id of the user who installed the integration */
  installerUserId: string;
  /** Name of the team/slack server */
  teamName: string;
}

/** Interface to represent Slack integration with channels */
export interface SlackIntegrationWithChannels extends SlackIntegration {
  /** Channels of the integration */
  channels: SlackChannel[];
}

/** Interface to represent Slack integration with channels and users */
export interface SlackIntegrationWithChannelsAndUsers extends SlackIntegration {
  /** Channels of the integration */
  channels: SlackChannelWithUser[];
}
