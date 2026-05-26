/**
 * Check If All As Appears Before All Bs
 * Intuition: If a 'b' has appeared, no subsequent 'a's should be found. An alternative perspective is to find the first 'b' and then verify that all characters following it are also 'b's or that no 'a' appears after it.
 * Approach: 1. Determine the index of the first occurrence of 'b' in the string. 2. If no 'b' is found (index is -1), it vacuously means all 'a's appear before all 'b's, so return true. 3. If a 'b' is found, iterate through the string starting from the position of the first 'b' to its end. 4. During this iteration, if any character encountered is an 'a', it signifies that an 'a' appears after a 'b', violating the condition, so return false. 5. If the iteration completes without finding any 'a's, it means the condition holds true, so return true.
 * Dry Run: s = "aab"
 * 1. `initialBPosition = s.indexOf('b')` -> `initialBPosition` becomes 2.
 * 2. `if (initialBPosition === -1)` is `false`.
 * 3. `scanPointer` is initialized to `2`.
 * 4. `while (scanPointer < s.length)` (i.e., `2 < 3` is true):
 *    a. `scanPointer = 2`: `s[2]` is 'b'. `if (s[2] === 'a')` is `false`. `scanPointer` increments to `3`.
 * 5. `while (scanPointer < s.length)` (i.e., `3 < 3` is false). Loop terminates.
 * 6. Return `true`.
 *
 * Dry Run: s = "bbaa"
 * 1. `initialBPosition = s.indexOf('b')` -> `initialBPosition` becomes 0.
 * 2. `if (initialBPosition === -1)` is `false`.
 * 3. `scanPointer` is initialized to `0`.
 * 4. `while (scanPointer < s.length)` (i.e., `0 < 4` is true):
 *    a. `scanPointer = 0`: `s[0]` is 'b'. `if (s[0] === 'a')` is `false`. `scanPointer` increments to `1`.
 * 5. `while (scanPointer < s.length)` (i.e., `1 < 4` is true):
 *    a. `scanPointer = 1`: `s[1]` is 'b'. `if (s[1] === 'a')` is `false`. `scanPointer` increments to `2`.
 * 6. `while (scanPointer < s.length)` (i.e., `2 < 4` is true):
 *    a. `scanPointer = 2`: `s[2]` is 'a'. `if (s[2] === 'a')` is `true`. Return `false`.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var checkString = function (s) {
  const initialBPosition = s.indexOf("b");

  if (initialBPosition === -1) {
    return true;
  }

  let scanPointer = initialBPosition;
  while (scanPointer < s.length) {
    if (s[scanPointer] === "a") {
      return false;
    }
    scanPointer++;
  }

  return true;
};
