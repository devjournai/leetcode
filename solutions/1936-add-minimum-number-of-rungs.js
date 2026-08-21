/**
 * Add Minimum Number Of Rungs
 * Intuition: You can climb at most `dist` height per jump. Between consecutive rungs (including ground at 0), if the gap exceeds `dist`, insert `floor((gap-1)/dist)` extra rungs to split the gap.
 * Approach: 1. Start at height 0. 2. For each next rung, `heightDifference = next - current`. 3. If `heightDifference > dist`, add `floor((heightDifference-1)/dist)` rungs. 4. Move `currentLadderHeight` to that rung and return the total extras.
 * Dry Run: rungs = [1, 3, 5, 10], dist = 2.
 *   - 0→1 gap 1 ≤ 2; 1→3 gap 2; 3→5 gap 2; 5→10 gap 5 → floor(4/2)=2 extra. Return 2.
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
