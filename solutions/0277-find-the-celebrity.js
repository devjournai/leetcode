/**
 * Find The Celebrity
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var solution = function (knows) {
  return function (n) {
    let potentialCelebrity = 0;

    for (let firstPassIndex = 1; firstPassIndex < n; firstPassIndex++) {
      if (knows(potentialCelebrity, firstPassIndex)) {
        potentialCelebrity = firstPassIndex;
      }
    }

    for (let secondPassIndex = 0; secondPassIndex < n; secondPassIndex++) {
      if (secondPassIndex !== potentialCelebrity && (knows(potentialCelebrity, secondPassIndex) || !knows(secondPassIndex, potentialCelebrity))) {
        return -1;
      }
    }

    return potentialCelebrity;
  };
};