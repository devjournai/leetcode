/**
 * Rectangle Overlap
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
