/**
 * Count Substrings Without Repeating Character
 * Intuition: A sliding window approach can efficiently count unique-character substrings. When the window expands to the right, if a new character creates a duplicate, the window must shrink from the left until the duplicate is resolved. For every valid window, all substrings ending at the current right pointer and starting from anywhere within that valid window contribute to the total count.
 * Approach: 1. Initialize `finalCountOfSpecial` to zero and `leftBoundary` to zero. Use a `charOccurrencesTracker` (Map) to store character frequencies within the current window. 2. Iterate `rightBoundary` from the start to the end of the string. 3. Add `s[rightBoundary]` to `charOccurrencesTracker`, incrementing its count. 4. While `s[rightBoundary]` has a count greater than one in `charOccurrencesTracker` (indicating a duplicate): decrement the count of `s[leftBoundary]` in the map, and if its count becomes zero, remove it entirely. Then, increment `leftBoundary`. 5. After the window `[leftBoundary, rightBoundary]` is guaranteed to have no repeating characters, add its length (`rightBoundary - leftBoundary + 1`) to `finalCountOfSpecial`. 6. Return `finalCountOfSpecial`.
 * Dry Run: s = "aba"
 *   - `stringLengthVal = 3`, `finalCountOfSpecial = 0`, `leftBoundary = 0`, `charOccurrencesTracker = Map()`
 *   - `rightBoundary = 0` (`s[0] = 'a'`)
 *     - `currentCharRight = 'a'`, `charOccurrencesTracker.set('a', 1)` (Map: {'a': 1})
 *     - `while` condition (Map.get('a') > 1) is false.
 *     - `finalCountOfSpecial += (0 - 0 + 1)` = 1.
 *   - `rightBoundary = 1` (`s[1] = 'b'`)
 *     - `currentCharRight = 'b'`, `charOccurrencesTracker.set('b', 1)` (Map: {'a': 1, 'b': 1})
 *     - `while` condition (Map.get('b') > 1) is false.
 *     - `finalCountOfSpecial += (1 - 0 + 1)` = 1 + 2 = 3.
 *   - `rightBoundary = 2` (`s[2] = 'a'`)
 *     - `currentCharRight = 'a'`, `charOccurrencesTracker.set('a', 2)` (Map: {'a': 2, 'b': 1})
 *     - `while` condition (Map.get('a') > 1) is true.
 *       - `charAtLeftBoundary = s[0] = 'a'`, `charOccurrencesTracker.set('a', 1)` (Map: {'a': 1, 'b': 1})
 *       - `charOccurrencesTracker.get('a')` is 1, not 0.
 *       - `leftBoundary++` to 1.
 *     - `while` condition (Map.get('a') > 1) is now false.
 *     - `finalCountOfSpecial += (2 - 1 + 1)` = 3 + 2 = 5.
 *   - End loop. Return 5. (Valid substrings: "a", "b", "a", "ab", "ba")
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var numberOfSpecialSubstrings = function (s) {
  const stringLengthVal = s.length;
  let finalCountOfSpecial = 0;
  let leftBoundary = 0;
  const charOccurrencesTracker = new Map();

  for (
    let rightBoundary = 0;
    rightBoundary < stringLengthVal;
    rightBoundary++
  ) {
    const currentCharRight = s[rightBoundary];
    charOccurrencesTracker.set(
      currentCharRight,
      (charOccurrencesTracker.get(currentCharRight) || 0) + 1
    );

    while (charOccurrencesTracker.get(currentCharRight) > 1) {
      const charAtLeftBoundary = s[leftBoundary];
      charOccurrencesTracker.set(
        charAtLeftBoundary,
        charOccurrencesTracker.get(charAtLeftBoundary) - 1
      );
      if (charOccurrencesTracker.get(charAtLeftBoundary) === 0) {
        charOccurrencesTracker.delete(charAtLeftBoundary);
      }
      leftBoundary++;
    }

    finalCountOfSpecial += rightBoundary - leftBoundary + 1;
  }

  return finalCountOfSpecial;
};
