/**
 * Count Largest Group
 * Intuition: Group 1..n by digit-sum. Count how many groups share the maximum size.
 * Approach: 1. For each i in 1..n, add i's digit sum to a map of group sizes and track the max size. 2. Count map values equal to that max.
 * Dry Run: n = 13.
 *   - Digit sums 1–4 each have two numbers (1/10, 2/11, 3/12, 4/13); sums 5–9 have one. Four groups share max size 2. Return 4.
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
