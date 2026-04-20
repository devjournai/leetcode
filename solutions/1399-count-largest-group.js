/**
 * Count Largest Group
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var countLargestGroup = function (n) {
  const sumOfDigitsFunction = (currentNumber) => {
    let sumValue = 0;
    while (currentNumber > 0) {
      sumValue += currentNumber % 10;
      currentNumber = Math.floor(currentNumber / 10);
    }
    return sumValue;
  };

  const groupMap = new Map();
  let maximumSizeFound = 0;

  for (let numberIterator = 1; numberIterator <= n; numberIterator++) {
    const currentDigitSum = sumOfDigitsFunction(numberIterator);
    const currentGroupSize = (groupMap.get(currentDigitSum) || 0) + 1;
    groupMap.set(currentDigitSum, currentGroupSize);
    maximumSizeFound = Math.max(maximumSizeFound, currentGroupSize);
  }

  let groupCount = 0;
  for (const recordedGroupSize of groupMap.values()) {
    if (recordedGroupSize === maximumSizeFound) {
      groupCount++;
    }
  }

  return groupCount;
};
