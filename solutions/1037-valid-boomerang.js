/**
 * Valid Boomerang
 * Intuition: Three points form a boomerang iff they are not collinear, i.e. the cross product of two edge vectors is nonzero.
 * Approach: 1. Read the three points. 2. Compute (y1-y2)*(x2-x3) vs (x1-x2)*(y2-y3). 3. Return whether those products differ.
 * Dry Run: points = [[1,1],[2,3],[3,2]].
 *   - Cross parts  (1-3)*(2-3)=(-2)*(-1)=2 vs (1-2)*(3-2)=(-1)*1=-1. Unequal -> true.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var isBoomerang = function (points) {
  const pointFirstX = points[0][0];
  const pointFirstY = points[0][1];
  const pointSecondX = points[1][0];
  const pointSecondY = points[1][1];
  const pointThirdX = points[2][0];
  const pointThirdY = points[2][1];

  const differenceYOneTwo = pointFirstY - pointSecondY;
  const differenceXTwoThree = pointSecondX - pointThirdX;
  const differenceXOneTwo = pointFirstX - pointSecondX;
  const differenceYTwoThree = pointSecondY - pointThirdY;

  const crossProductFirstPart = differenceYOneTwo * differenceXTwoThree;
  const crossProductSecondPart = differenceXOneTwo * differenceYTwoThree;

  return crossProductFirstPart !== crossProductSecondPart;
};
