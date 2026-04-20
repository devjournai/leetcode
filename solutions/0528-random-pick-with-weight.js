/**
 * Random Pick With Weight
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
