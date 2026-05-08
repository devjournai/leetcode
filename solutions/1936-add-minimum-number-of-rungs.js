/**
 * Add Minimum Number Of Rungs
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var addRungs = function (rungs, dist) {
  let currentLadderHeight = 0;
  let additionalRungsCount = 0;

  for (let rungIteration = 0; rungIteration < rungs.length; ++rungIteration) {
    const nextRungHeight = rungs[rungIteration];
    const heightDifference = nextRungHeight - currentLadderHeight;

    if (heightDifference > dist) {
      const requiredExtraSteps = Math.floor((heightDifference - 1) / dist);
      additionalRungsCount += requiredExtraSteps;
    }
    currentLadderHeight = nextRungHeight;
  }

  return additionalRungsCount;
};
