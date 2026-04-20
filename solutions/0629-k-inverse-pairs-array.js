/**
 * K Inverse Pairs Array
 * Time Complexity: O(n * k)
 * Space Complexity: O(k)
 */
var kInversePairs = function (n, k) {
  const modulusValue = 1e9 + 7;
  const dpCounts = new Array(k + 1).fill(0);

  dpCounts[0] = 1;

  for (let elementsAdded = 1; elementsAdded <= n; elementsAdded++) {
    const previousCounts = dpCounts.slice();
    dpCounts[0] = 1;

    for (let targetInversions = 1; targetInversions <= k; targetInversions++) {
      let currentCalculation =
        (previousCounts[targetInversions] + dpCounts[targetInversions - 1]) %
        modulusValue;

      if (targetInversions >= elementsAdded) {
        currentCalculation =
          (currentCalculation -
            previousCounts[targetInversions - elementsAdded] +
            modulusValue) %
          modulusValue;
      }
      dpCounts[targetInversions] = currentCalculation;
    }
  }

  return dpCounts[k];
};
