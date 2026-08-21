/**
 * Longest Absolute File Path
 * Intuition: Each line’s leading tabs are its depth; a stack of cumulative path lengths (including a slash) lets a file at that depth add its name onto the parent prefix. A name containing `.` is treated as a file.
 * Approach: 1. Split on `\n`. 2. Depth = last `\t` index + 1; pop the length stack down to that depth. 3. New length = parent total + name length + 1 (slash). 4. If the segment contains `.`, update the max with length−1 (drop the extra trailing slash).
 * Dry Run: "dir\n\tsubdir1\n\t\tfile.ext". dir length 4; subdir1 → 4+7+1=12; file.ext → 12+8+1=21, is file → max 20 ("dir/subdir1/file.ext").
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
        pathLengthWithoutTrailingSlash
      );
    }
  }

  return maximumAbsolutePathLength;
};
