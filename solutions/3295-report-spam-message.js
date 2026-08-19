/**
 * Report Spam Message
 * Intuition: A message is spam iff at least two of its words appear in the banned list (duplicates in the message each count). A hash set makes membership O(1).
 * Approach:
 * 1. Put `bannedWords` into a set.
 * 2. Scan `message`, increment a counter on hits, and return true as soon as the count exceeds 1.
 * Dry Run: message = ["hello","world","leetcode"], bannedWords = ["world","hello"]
 *   - "hello" banned, count=1
 *   - "world" banned, count=2 -> true
 * Time Complexity: O(|message| + |bannedWords|)
 * Space Complexity: O(|bannedWords|)
 */
var reportSpam = function (message, bannedWords) {
  const bannedWordsSet = new Set(bannedWords);
  let count = 0;

  for (const word of message) {
    if (bannedWordsSet.has(word) && ++count > 1) return true;
  }

  return false;
};
