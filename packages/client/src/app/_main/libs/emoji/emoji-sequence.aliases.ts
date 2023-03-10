/**
 * Emoji sequence aliases to replace in markdown preview
 */
export const EMOJI_SEQUENCE_ALIASES = {
  ':-)': 'đ',
  ':)': 'đ',
  ':-|': 'đ',
  ':|': 'đ',
  ':-(': 'âšī¸',
  ':(': 'âšī¸',
  ':-D': 'đ',
  ':D': 'đ',
  ':-p': 'đ',
  ':p': 'đ',
  ':-o': 'đ˛',
  ':o': 'đ˛',
  ';-)': 'đ',
  ';)': 'đ',
  '<3': 'â¤ī¸',
  '</3': 'đ',
  '8-)': 'đ',
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
