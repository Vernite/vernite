import { EmojiConvertor } from 'emoji-js';
import { EMOJI_SEQUENCE_ALIASES } from './emoji-sequence.aliases';
import { EMOJI_ALIASES } from './emoji.aliases';

export class Emoji {
  private static _emojiConvertor = (() => {
    const emojiConvertor = new EmojiConvertor();
    emojiConvertor.replace_mode = 'unified';
    emojiConvertor.allow_native = true;
    emojiConvertor.allow_caps = true;
    emojiConvertor.addAliases(EMOJI_ALIASES);
    return emojiConvertor;
  })();

  public static emojiNameToUnicode(emojiName: string) {
    return Emoji.colonsToUnicode(`:${emojiName}:`);
  }

  public static colonsToUnicode(source: string) {
    return Emoji._emojiConvertor.replace_colons(source);
  }

  public static characterSequenceToUnicode(characterSequence: string) {
    return (EMOJI_SEQUENCE_ALIASES as any)[characterSequence] || characterSequence;
  }

  public static unicodeToTwemoji(source: string) {
    (window as any).twemoji.parse(source, {
      size: '16x16',
      // ext: '.svg',
      base: 'https://twemoji.maxcdn.com/',
    });
  }
}
