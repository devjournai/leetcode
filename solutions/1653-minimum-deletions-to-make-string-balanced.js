/**
 * Minimum Deletions to Make String Balanced
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
      aCountOnRight + bCountOnLeft,
    );
  }

  return minDeletionsFound;
};
