/**
 * Generate Tag for Video Caption
 * Intuition: The tag is a '#' plus camelCase words from the caption, first word lowercased, later words capitalized, truncated to 100 characters.
 * Approach: 1. Split on whitespace. 2. Append lowercase first word, then Capitalized remaining words. 3. Slice to length 100.
 * Dry Run: caption = "Leetcode Daily Byte". Result "#leetcodeDailyByte".
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var generateTag = function (caption) {
  const words = caption.trim().split(/\s+/);
  let tag = "#";
  for (let i = 0; i < words.length; i++) {
    if (!words[i]) {
      continue;
    }
    const word = words[i].toLowerCase();
    if (i === 0) {
      tag += word;
    } else {
      tag += word.charAt(0).toUpperCase() + word.slice(1);
    }
    if (tag.length >= 100) {
      tag = tag.slice(0, 100);
      break;
    }
  }
  return tag;
};
