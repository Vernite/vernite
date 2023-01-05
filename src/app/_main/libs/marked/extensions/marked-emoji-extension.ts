import { EMOJI_SEQUENCE_REGEX } from '@main/libs/emoji/emoji-sequence.aliases';
import { Emoji } from '@main/libs/emoji/emoji.lib';
import { marked } from 'marked';

/**
 * Emoji token
 */
interface EmojiToken {
  /** Token type */
  type: 'emoji';
  /** Text to consume from the source */
  raw: string;
  /** Emoji name */
  emoji: string;
  /** Emoji type */
  emojiType: 'sequence' | 'colon';
}

/**
 * Emoji extension to use with `marked` parser
 *
 * Replaces only `:smile:` notation
 */
export const emoji = {
  name: 'emoji',
  level: 'inline', // This is an inline-level tokenizer
  start(src: string) {
    return src.indexOf(':');
  }, // Hint to Marked.js to stop and check for a match
  tokenizer(src: string, _tokens: any) {
    const rule = /^:(\w+):/; // Regex for the complete token, anchor to string start
    const match = rule.exec(src);

    const matchSequence = EMOJI_SEQUENCE_REGEX.exec(src);

    if (matchSequence) {
      return {
        type: 'emoji',
        raw: matchSequence[0],
        emoji: matchSequence[1],
        emojiType: 'sequence',
      };
    }

    if (match) {
      return {
        // Token to generate
        type: 'emoji', // Should match "name" above
        raw: match[0], // Text to consume from the source
        emoji: match[1], // Additional custom properties
        emojiType: 'colon',
      };
    }

    return undefined;
  },
  renderer(token: EmojiToken): string {
    const convertFunction =
      token.emojiType === 'colon' ? Emoji.emojiNameToUnicode : Emoji.characterSequenceToUnicode;
    const convertedEmoji = convertFunction(token.emoji);

    return `<span class="emoji">${convertedEmoji}</span>`;
  },
} as marked.TokenizerExtension & marked.RendererExtension;
