/**
 * Sum Game
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var sumGame = function (num) {
  const numberLength = num.length;
  const midPoint = numberLength / 2;

  let currentLeftSum = 0;
  let currentRightSum = 0;
  let leftUnknownCount = 0;
  let rightUnknownCount = 0;

  for (
    let currentPosition = 0;
    currentPosition < numberLength;
    currentPosition++
  ) {
    if (currentPosition < midPoint) {
      if (num[currentPosition] === "?") {
        leftUnknownCount++;
      } else {
        currentLeftSum += parseInt(num[currentPosition]);
      }
    } else {
      if (num[currentPosition] === "?") {
        rightUnknownCount++;
      } else {
        currentRightSum += parseInt(num[currentPosition]);
      }
    }
  }

  const finalSumDifference = currentLeftSum - currentRightSum;
  const finalQueryDifference = leftUnknownCount - rightUnknownCount;

  return (
    finalQueryDifference % 2 !== 0 ||
    finalSumDifference + finalQueryDifference * 4.5 !== 0
  );
};
