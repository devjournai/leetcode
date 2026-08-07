/**
 * Minimum Number Of Changes To Make Binary String Beautiful
 * Intuition: To make a string beautiful, it must be partitionable into even-length substrings of all '0's or all '1's. The simplest way to satisfy this is to make every adjacent pair of characters identical (e.g., "00", "11"). This creates a partition of length-2 substrings, each being beautiful. This strategy is optimal because any pair `s[i]s[i+1]` that contains different characters (e.g., "01" or "10") requires at least one change to become homogeneous ("00" or "11"), regardless of how it might be grouped with other characters. Since each pair's required change is independent, summing these minimal changes for each pair yields the overall minimum.
 * Approach: 1. Initialize a counter, `totalCount`, to zero. This will store the minimum number of changes. 2. Initialize a pointer, `currentPosition`, to the start of the string (index 0). 3. Use a `while` loop to iterate through the string in steps of two, processing character pairs. The loop continues as long as `currentPosition` is less than the string's total length. 4. Inside the loop, extract the character at `currentPosition` as `charAtCurrent` and the character at `currentPosition + 1` as `charAtNext`. 5. Compare `charAtCurrent` and `charAtNext`. If they are not equal, increment `totalCount` by one, as one change is needed to make this pair beautiful. 6. Advance `currentPosition` by two to move to the next pair. 7. After the loop completes, return `totalCount`.
 * Dry Run: s = "101011"
 *
 * Initialize `totalCount` = 0.
 * Initialize `currentPosition` = 0.
 * Initialize `maxPosition` = s.length (6).
 *
 * Loop 1: `currentPosition` (0) < `maxPosition` (6) is true.
 *   `charAtCurrent` = s[0] = '1'.
 *   `charAtNext` = s[1] = '0'.
 *   '1' !== '0' is true.
 *   `totalCount` becomes 1.
 *   `currentPosition` becomes 2.
 *
 * Loop 2: `currentPosition` (2) < `maxPosition` (6) is true.
 *   `charAtCurrent` = s[2] = '1'.
 *   `charAtNext` = s[3] = '0'.
 *   '1' !== '0' is true.
 *   `totalCount` becomes 2.
 *   `currentPosition` becomes 4.
 *
 * Loop 3: `currentPosition` (4) < `maxPosition` (6) is true.
 *   `charAtCurrent` = s[4] = '1'.
 *   `charAtNext` = s[5] = '1'.
 *   '1' !== '1' is false.
 *   `currentPosition` becomes 6.
 *
 * Loop 4: `currentPosition` (6) < `maxPosition` (6) is false. Loop terminates.
 *
 * Return `totalCount` (2).
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var minChanges = function (s) {
  let totalCount = 0;
  let currentPosition = 0;
  let maxPosition = s.length;

  while (currentPosition < maxPosition) {
    let charAtCurrent = s[currentPosition];
    let charAtNext = s[currentPosition + 1];

    if (charAtCurrent !== charAtNext) {
      totalCount++;
    }
    currentPosition += 2;
  }

  return totalCount;
};
