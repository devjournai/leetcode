/**
 * Rectangle Overlap
 * Intuition: Axis-aligned rectangles overlap iff their x-intervals and y-intervals both overlap (strict: touching edges do not count).
 * Approach: 1. Unpack rec1/rec2 as [xStart,yStart,xEnd,yEnd]. 2. `horizontalOverlap` = rec1.xStart < rec2.xEnd && rec2.xStart < rec1.xEnd. 3. Same for y. 4. Return both.
 * Dry Run: rec1=[0,0,2,2], rec2=[1,1,3,3] → x 0<3 and 1<2, y 0<3 and 1<2 → true. rec2=[2,2,3,3] → 0<3 but 2<2 is false → false.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var isRectangleOverlap = function (rec1, rec2) {
  const rectOneXStart = rec1[0];
  const rectOneYStart = rec1[1];
  const rectOneXEnd = rec1[2];
  const rectOneYEnd = rec1[3];

  const rectTwoXStart = rec2[0];
  const rectTwoYStart = rec2[1];
  const rectTwoXEnd = rec2[2];
  const rectTwoYEnd = rec2[3];

  const horizontalOverlap =
    rectOneXStart < rectTwoXEnd && rectTwoXStart < rectOneXEnd;
  const verticalOverlap =
    rectOneYStart < rectTwoYEnd && rectTwoYStart < rectOneYEnd;

  return horizontalOverlap && verticalOverlap;
};
