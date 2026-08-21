/**
 * First Bad Version
 * Intuition: Versions are monotonic: once a version is bad, all later ones are bad. Binary search for the leftmost bad version.
 * Approach: 1. Search [1, n], keep candidateBadVersion = n. 2. If mid is bad, record it and search left; else search right. 3. Return the recorded candidate.
 * Dry Run: n=5, first bad=4.
 *   - mid=3 good → start=4. mid=4 bad → candidate=4, end=3.
 *   - start>end. Return 4.
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */
var solution = function (isBadVersion) {
  return (n) => {
    let startVersion = 1;
    let endVersion = n;
    let candidateBadVersion = n;

    while (startVersion <= endVersion) {
      let midVersion =
        startVersion + Math.floor((endVersion - startVersion) / 2);

      if (isBadVersion(midVersion)) {
        candidateBadVersion = midVersion;
        endVersion = midVersion - 1;
      } else {
        startVersion = midVersion + 1;
      }
    }

    return candidateBadVersion;
  };
};
