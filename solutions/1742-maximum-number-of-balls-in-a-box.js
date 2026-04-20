/**
 * Maximum Number Of Balls In A Box
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
