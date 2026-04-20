/**
 * Longest Absolute File Path
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var lengthLongestPath = function (inputString) {
  const pathLengthsAtLevels = [0];
  let maximumAbsolutePathLength = 0;

  const linesSeparated = inputString.split("\n");

  for (const currentPathSegment of linesSeparated) {
    const lastTabPosition = currentPathSegment.lastIndexOf("\t");
    const currentSegmentDepth = lastTabPosition + 1;

    while (pathLengthsAtLevels.length > currentSegmentDepth + 1) {
      pathLengthsAtLevels.pop();
    }

    const segmentNameLength = currentPathSegment.length - currentSegmentDepth;
    const parentPathCurrentTotal = pathLengthsAtLevels.at(-1);
    const newCumulativePathLength =
      parentPathCurrentTotal + segmentNameLength + 1;

    pathLengthsAtLevels.push(newCumulativePathLength);

    const containsDot = currentPathSegment.includes(".");
    if (containsDot) {
      const pathLengthWithoutTrailingSlash = newCumulativePathLength - 1;
      maximumAbsolutePathLength = Math.max(
        maximumAbsolutePathLength,
        pathLengthWithoutTrailingSlash,
      );
    }
  }

  return maximumAbsolutePathLength;
};
