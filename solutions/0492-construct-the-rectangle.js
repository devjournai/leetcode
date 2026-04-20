/**
 * Construct The Rectangle
 * Time Complexity: O(sqrt(area))
 * Space Complexity: O(1)
 */
var constructRectangle = function (area) {
  let initialCandidateWidth = Math.floor(Math.sqrt(area));

  for (let currentWidthIteration = initialCandidateWidth; currentWidthIteration >= 1; currentWidthIteration--) {
    if (area % currentWidthIteration === 0) {
      let finalLength = area / currentWidthIteration;
      return [finalLength, currentWidthIteration];
    }
  }
};