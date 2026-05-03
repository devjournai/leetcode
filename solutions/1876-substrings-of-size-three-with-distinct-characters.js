/**
 * Substrings Of Size Three With Distinct Characters
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var countGoodSubstrings = function (s) {
  if (s.length < 3) {
    return 0;
  }

  let totalCount = 0;

  for (
    let currentLoopIndex = 0;
    currentLoopIndex <= s.length - 3;
    currentLoopIndex++
  ) {
    const charOne = s[currentLoopIndex];
    const charTwo = s[currentLoopIndex + 1];
    const charThree = s[currentLoopIndex + 2];

    if (charOne !== charTwo && charOne !== charThree && charTwo !== charThree) {
      totalCount++;
    }
  }

  return totalCount;
};
