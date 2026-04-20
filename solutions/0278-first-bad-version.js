/**
 * First Bad Version
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */
var solution = function (isBadVersion) {
  return n => {
    let startVersion = 1;
    let endVersion = n;
    let candidateBadVersion = n;

    while (startVersion <= endVersion) {
      let midVersion = startVersion + Math.floor((endVersion - startVersion) / 2);

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