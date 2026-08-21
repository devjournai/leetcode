/**
 * Minimum Deletions to Make String Balanced
 * Intuition: A balanced string is some number of a's then b's. For each split, deletions = b's on the left plus a's on the right; take the minimum (including deleting all a's).
 * Approach: 1. Count total a's. 2. Sweep left to right: on 'a' decrement remaining right a's; on 'b' increment left b's. 3. After each index, min deletions = leftB + rightA.
 * Dry Run: s="aababbab".
 *   - Best split yields 2 deletions (e.g. "aaabbb").
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minimumDeletions = function (s) {
  let totalAsCount = 0;
  for (const charOfS of s) {
    if (charOfS === "a") {
      totalAsCount++;
    }
  }

  let bCountOnLeft = 0;
  let minDeletionsFound = totalAsCount;
  let aCountOnRight = totalAsCount;

  const stringLength = s.length;
  for (
    let currentPosition = 0;
    currentPosition < stringLength;
    currentPosition++
  ) {
    const currentChar = s[currentPosition];
    if (currentChar === "a") {
      aCountOnRight--;
    } else {
      bCountOnLeft++;
    }
    minDeletionsFound = Math.min(
      minDeletionsFound,
      aCountOnRight + bCountOnLeft
    );
  }

  return minDeletionsFound;
};
