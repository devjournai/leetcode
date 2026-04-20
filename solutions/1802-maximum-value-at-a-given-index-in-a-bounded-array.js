/**
 * Maximum Value At A Given Index In A Bounded Array
 * Time Complexity: O(log(maxSum))
 * Space Complexity: O(1)
 */
var maxValue = function (n, index, maxSum) {
  function computeRequiredArraySum(peakValue) {
    let totalCurrentSum = peakValue;

    let leftBoundaryLength = index;
    let leftDecreasingCount = Math.min(leftBoundaryLength, peakValue - 1);

    let leftSeriesSum = 0;
    if (leftDecreasingCount > 0) {
      let firstElementLeft = peakValue - leftDecreasingCount;
      let lastElementLeft = peakValue - 1;
      leftSeriesSum =
        ((firstElementLeft + lastElementLeft) * leftDecreasingCount) / 2;
    }

    let leftOnesElements = leftBoundaryLength - leftDecreasingCount;
    let leftOnesSum = leftOnesElements;

    totalCurrentSum += leftSeriesSum;
    totalCurrentSum += leftOnesSum;

    let rightBoundaryLength = n - 1 - index;
    let rightDecreasingCount = Math.min(rightBoundaryLength, peakValue - 1);

    let rightSeriesSum = 0;
    if (rightDecreasingCount > 0) {
      let firstElementRight = peakValue - rightDecreasingCount;
      let lastElementRight = peakValue - 1;
      rightSeriesSum =
        ((firstElementRight + lastElementRight) * rightDecreasingCount) / 2;
    }

    let rightOnesElements = rightBoundaryLength - rightDecreasingCount;
    let rightOnesSum = rightOnesElements;

    totalCurrentSum += rightSeriesSum;
    totalCurrentSum += rightOnesSum;

    return totalCurrentSum;
  }

  let searchLowerBound = 1;
  let searchHigherBound = maxSum;
  let maximumAchievableValue = 1;

  while (searchLowerBound <= searchHigherBound) {
    let candidateMidValue = Math.floor(
      (searchLowerBound + searchHigherBound) / 2,
    );
    let neededSumForCandidate = computeRequiredArraySum(candidateMidValue);

    if (neededSumForCandidate <= maxSum) {
      maximumAchievableValue = candidateMidValue;
      searchLowerBound = candidateMidValue + 1;
    } else {
      searchHigherBound = candidateMidValue - 1;
    }
  }

  return maximumAchievableValue;
};
