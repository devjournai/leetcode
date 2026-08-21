/**
 * Random Pick With Weight
 * Intuition: Prefix sums turn weights into a number line. A uniform random value in `[0, total)` maps to an index via binary search for the first prefix strictly greater than that value.
 * Approach: 1. Constructor builds `cumulativeWeights` and `totalWeightSum`. 2. `pickIndex` draws `randomValue = Math.random() * total`. 3. Binary search the smallest prefix `> randomValue` and return that index.
 * Dry Run: weights = [1, 3]. Prefixes [1, 4].
 *   - Random in [0,1) → index 0; in [1,4) → index 1.
 * Time Complexity: O(log N)
 * Space Complexity: O(N)
 */
var Solution = function (inputWeights) {
  this.cumulativeWeights = [];
  let currentSum = 0;
  for (let k = 0; k < inputWeights.length; k++) {
    currentSum += inputWeights[k];
    this.cumulativeWeights.push(currentSum);
  }
  this.totalWeightSum = currentSum;
};

Solution.prototype.pickIndex = function () {
  const randomValue = Math.random() * this.totalWeightSum;
  let lowerBound = 0;
  let upperBound = this.cumulativeWeights.length - 1;
  let resultIndex = -1;

  while (lowerBound <= upperBound) {
    const midPoint = Math.floor((lowerBound + upperBound) / 2);
    if (this.cumulativeWeights[midPoint] > randomValue) {
      resultIndex = midPoint;
      upperBound = midPoint - 1;
    } else {
      lowerBound = midPoint + 1;
    }
  }
  return resultIndex;
};
