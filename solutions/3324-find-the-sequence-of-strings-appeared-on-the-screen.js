/**
 * Find the Sequence of Strings Appeared on the Screen
 * Intuition: The screen always appends 'a' then increments the last character until it matches the next target letter, recording every intermediate string.
 * Approach: 1. For each target character, append 'a' and record. 2. Increment the last character from 'b' through the target, recording after each change.
 * Dry Run: target = "abc"
 *   - "a"; then "aa","ab"; then "aba","abb","abc"
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var stringSequence = function (target) {
  const ans = [];
  const s = [];

  for (const targetChar of target) {
    s.push("a");
    ans.push(s.join(""));
    for (
      let code = "b".charCodeAt(0);
      code <= targetChar.charCodeAt(0);
      code++
    ) {
      s[s.length - 1] = String.fromCharCode(code);
      ans.push(s.join(""));
    }
  }

  return ans;
};
