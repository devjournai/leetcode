/**
 * Number Of Rectangles That Can Form The Largest Square
 * Intuition: Each rectangle can cut a square of side min(l,w). Count how many rectangles achieve the global maximum of that side.
 * Approach: 1. Scan all rectangles for `maximumAchievableSide`. 2. Count how many have `min(l,w) === maximumAchievableSide`. 3. Return `goodRectangleCounter`.
 * Dry Run: rectangles = [[5,8],[3,9],[5,12],[16,5]]
 * sides 5,3,5,5; max 5; count 3.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var countGoodRectangles = function (rectangles) {
  let maximumAchievableSide = 0;

  let indexOne = 0;
  const totalRectangles = rectangles.length;
  while (indexOne < totalRectangles) {
    const currentRectangleDimensions = rectangles[indexOne];
    const rectangleLength = currentRectangleDimensions[0];
    const rectangleWidth = currentRectangleDimensions[1];
    const potentialSide = Math.min(rectangleLength, rectangleWidth);

    if (potentialSide > maximumAchievableSide) {
      maximumAchievableSide = potentialSide;
    }
    indexOne++;
  }

  let goodRectangleCounter = 0;

  let indexTwo = 0;
  while (indexTwo < totalRectangles) {
    const particularRectangle = rectangles[indexTwo];
    const particularLength = particularRectangle[0];
    const particularWidth = particularRectangle[1];
    const formableSide = Math.min(particularLength, particularWidth);

    if (formableSide === maximumAchievableSide) {
      goodRectangleCounter++;
    }
    indexTwo++;
  }

  return goodRectangleCounter;
};
