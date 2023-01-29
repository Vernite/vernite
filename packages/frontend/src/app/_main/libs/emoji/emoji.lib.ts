import { EmojiConvertor } from 'emoji-js';
import { EMOJI_SEQUENCE_ALIASES } from './emoji-sequence.aliases';
import { EMOJI_ALIASES } from './emoji.aliases';

/** Emoji library */
export class Emoji {
  /** Emoji convertor initialization */
  private static _emojiConvertor = (() => {
    const emojiConvertor = new EmojiConvertor();
    emojiConvertor.replace_mode = 'unified';
    emojiConvertor.allow_native = true;
    emojiConvertor.allow_caps = true;
    emojiConvertor.addAliases(EMOJI_ALIASES);
    return emojiConvertor;
  })();

  /**
   * Emoji name to unicode converter
   * @param emojiName emoji name to convert to unicode
   * @returns unicode emoji
   */
  public static emojiNameToUnicode(emojiName: string) {
    return Emoji.colonsToUnicode(`:${emojiName}:`);
  }

  /**
   * Emoji colons notation to unicode converter
   * @param source colons notation to convert to unicode
   * @returns unicode emoji
   */
  public static colonsToUnicode(source: string) {
    return Emoji._emojiConvertor.replace_colons(source);
  }

  /**
   * Emoji character sequence notation to unicode converter
   * @param characterSequence character sequence to convert to unicode
   * @returns unicode emoji
   */
  public static characterSequenceToUnicode(characterSequence: string) {
    return (EMOJI_SEQUENCE_ALIASES as any)[characterSequence] || characterSequence;
  }

  /**
   * Emoji unicode to Twemoji converter (not used at now)
   * @param source unicode emoji to convert to svg
   */
  public static unicodeToTwemoji(source: string) {
    (window as any).twemoji.parse(source, {
      size: '16x16',
      // ext: '.svg',
      base: 'https://twemoji.maxcdn.com/',
    });
  }
}
