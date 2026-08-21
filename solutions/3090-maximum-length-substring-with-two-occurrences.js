/**
 * Maximum Length Substring With Two Occurrences
 * Intuition: To find the longest substring where each character appears at most twice, a sliding window approach is efficient. We expand the window from the right, keeping track of character frequencies. If any character's frequency exceeds two, we shrink the window from the left until the condition is met again, continuously updating the maximum valid length.
 * Approach: 1. Initialize `maxLengthFound` to 0, a `charFrequencyTracker` (Map) for character counts, and `windowStartPointer` to 0. 2. Iterate `windowEndPointer` from 0 to the end of the string. 3. For each `characterAtWindowEnd`, increment its count in `charFrequencyTracker`. 4. While the count of `characterAtWindowEnd` (or any character in the window) in `charFrequencyTracker` is greater than 2, decrement the count of the character at `windowStartPointer` and advance `windowStartPointer`. 5. After each adjustment (or lack thereof), update `maxLengthFound` with the current window length (`windowEndPointer - windowStartPointer + 1`). 6. Return `maxLengthFound`.
 * Dry Run: s = "aabacbebebe"
 *   - `inputStringValue` = "aabacbebebe", `maxLengthFound` = 0, `charFrequencyTracker` = {}, `windowStartPointer` = 0
 *   - `windowEndPointer` = 0 ('a'): `charFrequencyTracker` = {'a': 1}. Valid. `maxLengthFound` = max(0, 0-0+1) = 1. Window: "a"
 *   - `windowEndPointer` = 1 ('a'): `charFrequencyTracker` = {'a': 2}. Valid. `maxLengthFound` = max(1, 1-0+1) = 2. Window: "aa"
 *   - `windowEndPointer` = 2 ('b'): `charFrequencyTracker` = {'a': 2, 'b': 1}. Valid. `maxLengthFound` = max(2, 2-0+1) = 3. Window: "aab"
 *   - `windowEndPointer` = 3 ('a'): `charFrequencyTracker` = {'a': 3, 'b': 1}. Invalid ('a' count > 2).
 *     - `characterAtWindowStart` = 'a' (at `windowStartPointer`=0). `charFrequencyTracker`['a'] = 2. `windowStartPointer` = 1. Window: "aba". Valid.
 *   - `maxLengthFound` = max(3, 3-1+1) = 3.
 *   - `windowEndPointer` = 4 ('c'): `charFrequencyTracker` = {'a': 2, 'b': 1, 'c': 1}. Valid. `maxLengthFound` = max(3, 4-1+1) = 4. Window: "abac"
 *   - `windowEndPointer` = 5 ('b'): `charFrequencyTracker` = {'a': 2, 'b': 2, 'c': 1}. Valid. `maxLengthFound` = max(4, 5-1+1) = 5. Window: "abacb"
 *   - `windowEndPointer` = 6 ('e'): `charFrequencyTracker` = {'a': 2, 'b': 2, 'c': 1, 'e': 1}. Valid. `maxLengthFound` = max(5, 6-1+1) = 6. Window: "abacbe"
 *   - `windowEndPointer` = 7 ('b'): `charFrequencyTracker` = {'a': 2, 'b': 3, 'c': 1, 'e': 1}. Invalid ('b' count > 2).
 *     - `characterAtWindowStart` = 'b' (at `windowStartPointer`=1). `charFrequencyTracker`['b'] = 2. `windowStartPointer` = 2. Window: "bacbeb". Valid.
 *   - `maxLengthFound` = max(6, 7-2+1) = 6.
 *   - `windowEndPointer` = 8 ('e'): `charFrequencyTracker` = {'a': 2, 'b': 2, 'c': 1, 'e': 2}. Valid. `maxLengthFound` = max(6, 8-2+1) = 7. Window: "bacbebe"
 *   - `windowEndPointer` = 9 ('b'): `charFrequencyTracker` = {'a': 2, 'b': 3, 'c': 1, 'e': 2}. Invalid ('b' count > 2).
 *     - `characterAtWindowStart` = 'a' (at `windowStartPointer`=2). `charFrequencyTracker`['a'] = 1. `windowStartPointer` = 3.
 *     - `characterAtWindowStart` = 'c' (at `windowStartPointer`=3). `charFrequencyTracker`['c'] = 0. Delete 'c'. `windowStartPointer` = 4.
 *     - `characterAtWindowStart` = 'b' (at `windowStartPointer`=4). `charFrequencyTracker`['b'] = 2. `windowStartPointer` = 5. Window: "ebebeb". Valid.
 *   - `maxLengthFound` = max(7, 9-5+1) = 7.
 *   - `windowEndPointer` = 10 ('e'): `charFrequencyTracker` = {'a': 1, 'b': 2, 'e': 3}. Invalid ('e' count > 2).
 *     - `characterAtWindowStart` = 'b' (at `windowStartPointer`=5). `charFrequencyTracker`['b'] = 1. `windowStartPointer` = 6.
 *     - `characterAtWindowStart` = 'e' (at `windowStartPointer`=6). `charFrequencyTracker`['e'] = 2. `windowStartPointer` = 7. Window: "bebe". Valid.
 *   - `maxLengthFound` = max(7, 10-7+1) = 7.
 *   - End of string. Return `maxLengthFound` = 7.
 * Time Complexity: O(N)
 * Space Complexity: O(K)
 */
var maximumLengthSubstring = function (s) {
  let maxLengthFound = 0;
  const charFrequencyTracker = new Map();

  for (
    let windowStartPointer = 0, windowEndPointer = 0;
    windowEndPointer < s.length;
    windowEndPointer++
  ) {
    const characterAtWindowEnd = s[windowEndPointer];
    charFrequencyTracker.set(
      characterAtWindowEnd,
      (charFrequencyTracker.get(characterAtWindowEnd) || 0) + 1
    );

    while (charFrequencyTracker.get(characterAtWindowEnd) > 2) {
      const characterAtWindowStart = s[windowStartPointer];
      const occurrencesToRemove =
        charFrequencyTracker.get(characterAtWindowStart) - 1;
      charFrequencyTracker.set(characterAtWindowStart, occurrencesToRemove);
      if (occurrencesToRemove === 0) {
        charFrequencyTracker.delete(characterAtWindowStart);
      }
      windowStartPointer++;
    }

    maxLengthFound = Math.max(
      maxLengthFound,
      windowEndPointer - windowStartPointer + 1
    );
  }

  return maxLengthFound;
};
