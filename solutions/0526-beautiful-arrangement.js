/**
 * Beautiful Arrangement
 * Time Complexity: O(N!)
 * Space Complexity: O(N)
 */
var countArrangement = function (inputN) {
  let countOfBeautifulArrangements = 0;

  function depthFirstSearch(currentIdx, alreadyUsedMask) {
    if (currentIdx > inputN) {
      countOfBeautifulArrangements++;
      return;
    }

    for (let potentialValue = 1; potentialValue <= inputN; potentialValue++) {
      const isValueAvailable = !(alreadyUsedMask & (1 << potentialValue));
      const satisfiesCondition =
        potentialValue % currentIdx === 0 || currentIdx % potentialValue === 0;

      if (isValueAvailable && satisfiesCondition) {
        depthFirstSearch(
          currentIdx + 1,
          alreadyUsedMask | (1 << potentialValue),
        );
      }
    }
  }

  depthFirstSearch(1, 0);
  return countOfBeautifulArrangements;
};
