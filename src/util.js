export function isEmoji(str) {
  return str.match(/^([\uD800-\uDBFF][\uDC00-\uDFFF])+$/g);
}
