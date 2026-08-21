/**
 * Construct The Rectangle
 * Intuition: Among factor pairs (L, W) with L*W = area and L ≥ W, the closest pair starts near sqrt(area) and walks W downward until it divides the area; then L = area/W.
 * Approach: 1. `initialCandidateWidth = floor(sqrt(area))`. 2. For W from that value down to 1, if `area % W === 0` return `[area/W, W]`.
 * Dry Run: area = 4.
 *   - sqrt=2, 4%2===0 → [2,2].
 *   - area = 37: sqrt=6, 6..2 fail, W=1 → [37,1].
 * Time Complexity: O(sqrt(area))
 * Space Complexity: O(1)
 */
var constructRectangle = function (area) {
  let initialCandidateWidth = Math.floor(Math.sqrt(area));

  for (
    let currentWidthIteration = initialCandidateWidth;
    currentWidthIteration >= 1;
    currentWidthIteration--
  ) {
    if (area % currentWidthIteration === 0) {
      let finalLength = area / currentWidthIteration;
      return [finalLength, currentWidthIteration];
    }
  }
};
