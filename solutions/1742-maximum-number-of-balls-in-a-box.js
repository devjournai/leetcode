/**
 * Maximum Number Of Balls In A Box
 * Intuition: Ball i goes to the box numbered by the sum of i's digits. Count occupancy over [lowLimit, highLimit] and return the max.
 * Approach: 1. For each `currentBallNumber`, sum digits into `boxIdentifier`. 2. Increment `boxTallies` and track `maxBallsInBox`. 3. Return the max.
 * Dry Run: lowLimit = 1, highLimit = 10
 * boxes: 1..9 each 1, 10 → box 1 has 2. Max = 2.
 * Time Complexity: O((highLimit - lowLimit + 1) * log(highLimit))
 * Space Complexity: O(log(highLimit))
 */
var countBalls = function (lowLimit, highLimit) {
  const boxTallies = new Map();
  let maxBallsInBox = 0;
  let currentBallNumber = lowLimit;

  while (currentBallNumber <= highLimit) {
    let currentBallString = currentBallNumber.toString();
    let runningSum = 0;

    for (
      let digitIndex = 0;
      digitIndex < currentBallString.length;
      digitIndex++
    ) {
      let digitChar = currentBallString[digitIndex];
      let digitValue = parseInt(digitChar, 10);
      runningSum += digitValue;
    }

    let boxIdentifier = runningSum;
    let existingBoxCount = boxTallies.get(boxIdentifier) || 0;
    let updatedBoxCount = existingBoxCount + 1;
    boxTallies.set(boxIdentifier, updatedBoxCount);

    maxBallsInBox = Math.max(maxBallsInBox, updatedBoxCount);

    currentBallNumber++;
  }

  return maxBallsInBox;
};
