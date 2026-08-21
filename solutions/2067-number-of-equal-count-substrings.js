/**
 * Number Of Equal Count Substrings
 * Intuition: A substring with `k` unique characters, each appearing `count` times, must have a total length of `k * count`. We can iterate through all possible numbers of unique characters (`k` from 1 to 26) and for each `k`, use a fixed-size sliding window of length `k * count` to check for valid substrings.
 * Approach: 1. Initialize a counter for total valid substrings. 2. Iterate `currentUniqueCharacterCount` from 1 to 26. This variable represents the target number of unique characters in a valid substring. 3. Calculate `requiredSubstringLength` as `currentUniqueCharacterCount * count`. If this length exceeds the total string length, break the loop as no longer substrings are possible. 4. For each `currentUniqueCharacterCount`, use a sliding window of `requiredSubstringLength`. Maintain a `windowCharFrequencies` map to store character counts within the current window and `charactersMeetingCount` to track how many unique characters currently have a frequency exactly equal to `count`. 5. Expand the window by adding `currentCharEnd` at `windowEndIndex`. Update its frequency in `windowCharFrequencies`. Adjust `charactersMeetingCount`: increment if `currentCharEnd`'s frequency becomes `count`, decrement if it becomes `count + 1`. 6. Once the window reaches `requiredSubstringLength`, check if it forms a valid substring: both `charactersMeetingCount` must equal `currentUniqueCharacterCount` AND `windowCharFrequencies.size` must equal `currentUniqueCharacterCount` (ensuring no other characters exist). If both conditions are met, increment the total count. 7. Contract the window by removing `currentCharStart` at `windowStartIndex`. Update its frequency in `windowCharFrequencies`. Adjust `charactersMeetingCount`: decrement if `currentCharStart`'s frequency was `count`, increment if it was `count + 1`. If its frequency becomes 0, remove it from the map. 8. Return the total count after iterating through all possible `currentUniqueCharacterCount` values.
 * Dry Run: s = "aaabbbccc", count = 3
 *   stringLength = 9, totalEqualCountSubstrings = 0
 *   currentUniqueCharacterCount = 1:
 *     requiredSubstringLength = 1 * 3 = 3
 *     windowCharFrequencies = {}, charactersMeetingCount = 0
 *     windowEndIndex = 0, 'a': windowCharFrequencies = {'a':1}
 *     windowEndIndex = 1, 'a': windowCharFrequencies = {'a':2}
 *     windowEndIndex = 2, 'a': windowCharFrequencies = {'a':3}, charactersMeetingCount = 1. Window "aaa".
 *       windowStartIndex = 0. Check: charactersMeetingCount (1) === 1 && windowCharFrequencies.size (1) === 1. True. totalEqualCountSubstrings = 1.
 *       Remove s[0]='a': windowCharFrequencies = {'a':2}, charactersMeetingCount = 0.
 *     windowEndIndex = 3, 'a': windowCharFrequencies = {'a':3}, charactersMeetingCount = 1. Window "aaa".
 *       windowStartIndex = 1. Check: charactersMeetingCount (1) === 1 && windowCharFrequencies.size (1) === 1. True. totalEqualCountSubstrings = 2.
 *       Remove s[1]='a': windowCharFrequencies = {'a':2}, charactersMeetingCount = 0.
 *     ... (Similar for "aaa" s[2..4], then "bbb" s[3..5], "bbb" s[4..6], "bbb" s[5..7], "ccc" s[6..8])
 *     When windowEndIndex = 5: current window s[3..5] is "bbb". windowCharFrequencies = {'b':3}, charactersMeetingCount = 1.
 *       windowStartIndex = 3. Check: (1 === 1 && 1 === 1). True. totalEqualCountSubstrings = 3 (after previous "aaa"s).
 *       Remove s[3]='b': windowCharFrequencies = {'b':2}, charactersMeetingCount = 0.
 *     When windowEndIndex = 8: current window s[6..8] is "ccc". windowCharFrequencies = {'c':3}, charactersMeetingCount = 1.
 *       windowStartIndex = 6. Check: (1 === 1 && 1 === 1). True. totalEqualCountSubstrings = 5 (after previous "aaa" and "bbb"s).
 *       Remove s[6]='c': windowCharFrequencies = {'c':2}, charactersMeetingCount = 0.
 *   currentUniqueCharacterCount = 2:
 *     requiredSubstringLength = 2 * 3 = 6
 *     windowCharFrequencies = {}, charactersMeetingCount = 0
 *     ...
 *     windowEndIndex = 5: current window s[0..5] is "aaabbb". windowCharFrequencies = {'a':3, 'b':3}, charactersMeetingCount = 2.
 *       windowStartIndex = 0. Check: charactersMeetingCount (2) === 2 && windowCharFrequencies.size (2) === 2. True. totalEqualCountSubstrings = 6.
 *       Remove s[0]='a': windowCharFrequencies = {'a':2, 'b':3}, charactersMeetingCount = 1.
 *     windowEndIndex = 6: current window s[1..6] is "aabbbc". windowCharFrequencies = {'a':2, 'b':3, 'c':1}, charactersMeetingCount = 1.
 *       windowStartIndex = 1. Check: (1 === 2 && 3 === 2). False.
 *       Remove s[1]='a': windowCharFrequencies = {'a':1, 'b':3, 'c':1}, charactersMeetingCount = 1.
 *     ... No more valid substrings for currentUniqueCharacterCount = 2.
 *   currentUniqueCharacterCount = 3:
 *     requiredSubstringLength = 3 * 3 = 9
 *     ...
 *     windowEndIndex = 8: current window s[0..8] is "aaabbbccc". windowCharFrequencies = {'a':3, 'b':3, 'c':3}, charactersMeetingCount = 3.
 *       windowStartIndex = 0. Check: charactersMeetingCount (3) === 3 && windowCharFrequencies.size (3) === 3. True. totalEqualCountSubstrings = 7.
 *       Remove s[0]='a': windowCharFrequencies = {'a':2, 'b':3, 'c':3}, charactersMeetingCount = 2.
 *   currentUniqueCharacterCount = 4: requiredSubstringLength = 12 > 9. Break.
 *   Final totalEqualCountSubstrings = 7.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var equalCountSubstrings = function (s, count) {
  const stringLength = s.length;
  let totalEqualCountSubstrings = 0;

  for (
    let currentUniqueCharacterCount = 1;
    currentUniqueCharacterCount <= 26;
    currentUniqueCharacterCount++
  ) {
    const requiredSubstringLength = currentUniqueCharacterCount * count;

    if (requiredSubstringLength > stringLength) {
      break;
    }

    const windowCharFrequencies = new Map();
    let charactersMeetingTargetCount = 0;

    for (
      let windowEndIndex = 0;
      windowEndIndex < stringLength;
      windowEndIndex++
    ) {
      const charAtEnd = s[windowEndIndex];

      const updatedFrequencyEnd =
        (windowCharFrequencies.get(charAtEnd) || 0) + 1;
      windowCharFrequencies.set(charAtEnd, updatedFrequencyEnd);

      if (updatedFrequencyEnd === count) {
        charactersMeetingTargetCount++;
      } else if (updatedFrequencyEnd === count + 1) {
        charactersMeetingTargetCount--;
      }

      if (windowEndIndex >= requiredSubstringLength - 1) {
        const windowStartIndex = windowEndIndex - requiredSubstringLength + 1;

        if (
          charactersMeetingTargetCount === currentUniqueCharacterCount &&
          windowCharFrequencies.size === currentUniqueCharacterCount
        ) {
          totalEqualCountSubstrings++;
        }

        const charAtStart = s[windowStartIndex];
        const currentFrequencyStart = windowCharFrequencies.get(charAtStart);

        if (currentFrequencyStart === count) {
          charactersMeetingTargetCount--;
        } else if (currentFrequencyStart === count + 1) {
          charactersMeetingTargetCount++;
        }

        windowCharFrequencies.set(charAtStart, currentFrequencyStart - 1);

        if (windowCharFrequencies.get(charAtStart) === 0) {
          windowCharFrequencies.delete(charAtStart);
        }
      }
    }
  }

  return totalEqualCountSubstrings;
};
