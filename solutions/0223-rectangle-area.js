/**
 * Rectangle Area
 * Intuition: Combined area is A + B minus the overlap. Overlap width/height are max(0, min(right) - max(left)) and the analogous y interval.
 * Approach: 1. Area of each rectangle from (x2-x1)*(y2-y1). 2. Intersection width = max(0, min(ax2,bx2)-max(ax1,bx1)); same for height. 3. Return sum of areas minus width*height of the overlap.
 * Dry Run: A = (0,0)-(2,2), B = (1,1)-(3,3).
 *   - Areas 4 and 4; overlap 1×1 = 1; return 7.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var computeArea = function (ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
  const rectOneWidth = ax2 - ax1;
  const rectOneHeight = ay2 - ay1;
  const rectOneTotalArea = rectOneWidth * rectOneHeight;

  const rectTwoWidth = bx2 - bx1;
  const rectTwoHeight = by2 - by1;
  const rectTwoTotalArea = rectTwoWidth * rectTwoHeight;

  const overlapLeftX = Math.max(ax1, bx1);
  const overlapRightX = Math.min(ax2, bx2);
  const horizontalOverlap = Math.max(0, overlapRightX - overlapLeftX);

  const overlapBottomY = Math.max(ay1, by1);
  const overlapTopY = Math.min(ay2, by2);
  const verticalOverlap = Math.max(0, overlapTopY - overlapBottomY);

  const intersectionArea = horizontalOverlap * verticalOverlap;

  const finalCombinedArea =
    rectOneTotalArea + rectTwoTotalArea - intersectionArea;

  return finalCombinedArea;
};
