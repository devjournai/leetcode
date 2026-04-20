/**
 * Rectangle Area
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

    const finalCombinedArea = rectOneTotalArea + rectTwoTotalArea - intersectionArea;

    return finalCombinedArea;
};