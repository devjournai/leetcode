/**
 * Maximum Points Inside the Square
 * Intuition: An axis-aligned square centered at the origin is defined by size = max(|x|, |y|). Tags must be unique inside the square, so the largest valid size is just below the second-closest occurrence of any repeated tag (or any second point of a duplicate tag). Count tags whose closest point is strictly inside that limit.
 * Approach: 1. For each tag, track the smallest Chebyshev distance of its points. 2. Track the second-smallest distance among all points that would create a duplicate tag. 3. Count tags whose closest distance is strictly smaller than that second-min size.
 * Dry Run: points = [[1, 1], [-2, -2], [2, 2]], s = "abb"
 * - Sizes: a at 1, b at 2, second b at 2 so the duplicate cutoff is 2
 * - Only tag a has closest size < 2, so the answer is 1
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var maxPointsInsideSquare = function (points, s) {
  let secondMinSize = Number.MAX_SAFE_INTEGER;
  const minSizes = new Array(26).fill(Number.MAX_SAFE_INTEGER);

  for (let i = 0; i < points.length; i++) {
    const size = Math.max(Math.abs(points[i][0]), Math.abs(points[i][1]));
    const tag = s.charCodeAt(i) - 97;
    if (minSizes[tag] === Number.MAX_SAFE_INTEGER) {
      minSizes[tag] = size;
    } else if (size < minSizes[tag]) {
      secondMinSize = Math.min(secondMinSize, minSizes[tag]);
      minSizes[tag] = size;
    } else {
      secondMinSize = Math.min(secondMinSize, size);
    }
  }

  let answer = 0;
  for (const size of minSizes) {
    if (size < secondMinSize) {
      answer++;
    }
  }
  return answer;
};
