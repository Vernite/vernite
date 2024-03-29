/**
 * Emoji sequence aliases to replace in markdown preview
 */
export const EMOJI_SEQUENCE_ALIASES = {
  ':-)': '🙂',
  ':)': '🙂',
  ':-|': '😐',
  ':|': '😐',
  ':-(': '☹️',
  ':(': '☹️',
  ':-D': '😃',
  ':D': '😃',
  ':-p': '😛',
  ':p': '😛',
  ':-o': '😲',
  ':o': '😲',
  ';-)': '😉',
  ';)': '😉',
  '<3': '❤️',
  '</3': '💔',
  '8-)': '😎',
};

/**
 * Emoji sequence regex to replace in markdown preview
 */
export const EMOJI_SEQUENCE_REGEX = new RegExp(
  '^(' +
    Object.keys(EMOJI_SEQUENCE_ALIASES)
      .map((sequence) =>
        sequence
          .split('')
          .map((char) => ([')', '(', '|'].includes(char) ? `\\${char}` : char))
          .join(''),
      )
      .join('|') +
    ')',
  'gi',
);
