/**
 * Sum Of Floored Pairs
 * Time Complexity: O(N + M log M)
 * Space Complexity: O(M)
 */
var sumOfFlooredPairs = function (nums) {
  const modulusConstant = 1e9 + 7;
  let maximumElement = 0;
  for (const initialNum of nums) {
    if (initialNum > maximumElement) {
      maximumElement = initialNum;
    }
  }

  const elementCounts = new Array(maximumElement + 1).fill(0);
  for (const currentNum of nums) {
    elementCounts[currentNum]++;
  }

  const cumulativeCounts = new Array(maximumElement + 1).fill(0);
  for (let currentVal = 1; currentVal <= maximumElement; currentVal++) {
    cumulativeCounts[currentVal] =
      cumulativeCounts[currentVal - 1] + elementCounts[currentVal];
  }

  let finalSum = 0;

  for (
    let currentDenominator = 1;
    currentDenominator <= maximumElement;
    currentDenominator++
  ) {
    if (elementCounts[currentDenominator] === 0) {
      continue;
    }

    let currentMultiplier = 1;
    while (true) {
      const lowerBound = currentMultiplier * currentDenominator;
      if (lowerBound > maximumElement) {
        break;
      }
      const upperBound = (currentMultiplier + 1) * currentDenominator - 1;

      const countInRange =
        cumulativeCounts[Math.min(maximumElement, upperBound)] -
        cumulativeCounts[lowerBound - 1];

      let termComponentOne = elementCounts[currentDenominator];
      let termComponentTwo = countInRange;
      let termComponentThree = currentMultiplier;

      let termValue = (termComponentOne * termComponentTwo) % modulusConstant;
      termValue = (termValue * termComponentThree) % modulusConstant;

      finalSum = (finalSum + termValue) % modulusConstant;

      currentMultiplier++;
    }
  }

  return finalSum;
};
