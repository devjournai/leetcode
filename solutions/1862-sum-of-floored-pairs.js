/**
 * Sum Of Floored Pairs
 * Intuition: For each possible divisor d, floor(nums[j]/d) is constant on ranges [k*d, (k+1)*d−1]. Count frequencies and prefix counts to add freq(d)*k*count(range) for each k.
 * Approach: 1. Count `elementCounts` up to `maximumElement`. 2. Build `cumulativeCounts`. 3. For each d with positive count, for each multiplier, add the modular product into `finalSum`.
 * Dry Run: nums=[2,5,9]. Pairs floors sum to 10 (including i,j both ways per problem). Return 10.
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
