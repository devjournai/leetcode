/**
 * Check if Binary String Has at Most One Segment of Ones
 * Intuition: At most one run of ones means after the first 0 there must be no later 1.
 * Approach: 1. Find `firstZeroPosition`. 2. If none, the string is all ones → true. 3. Scan the suffix; any `'1'` returns false. 4. Otherwise true.
 * Dry Run: s = "1001".
 *   - First 0 at index 1; later '1' at index 3 → false.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var checkOnesSegment = function (s) {
  let stringLength = s.length;
  let initialIndex = 0;
  let firstZeroPosition = -1;

  for (initialIndex = 0; initialIndex < stringLength; initialIndex++) {
    let characterValue = s[initialIndex];
    if (characterValue === "0") {
      firstZeroPosition = initialIndex;
      break;
    }
  }

  if (firstZeroPosition === -1) {
    return true;
  }

  let searchIndex = firstZeroPosition + 1;
  while (searchIndex < stringLength) {
    let checkedCharacter = s[searchIndex];
    if (checkedCharacter === "1") {
      return false;
    }
    searchIndex++;
  }

  return true;
};
