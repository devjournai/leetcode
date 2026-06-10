/**
 * Sum Of Total Strength Of Wizards
 * Intuition: The problem asks us to sum `(min_value * sum_of_values)` for all contiguous subarrays. A naive O(N^3) or O(N^2) approach would be too slow. We can optimize by iterating through each element `strength[i]` and considering it as the minimum element of various subarrays. For `strength[i]` to be the minimum, all elements within a subarray `strength[left...right]` must be greater than or equal to `strength[i]`. We first find the exact range `[L, R]` (where `L` is `leftBoundary[i] + 1` and `R` is `rightBoundary[i] - 1`) such that `strength[i]` is the minimum within any subarray `strength[j...k]` where `L <= j <= i <= k <= R`. Once this range is found for each `i`, the core challenge is to efficiently calculate `sum_{j=L to i} sum_{k=i to R} (sum(strength[j...k]))`. This requires a "prefix sum of prefix sums" technique to handle the double summation of subarray sums effectively.
 * Approach:
 * 1. Precompute `leftIndices` and `rightIndices` for each element `strength[i]`. `leftIndices[i]` is the index of the first element to the left of `i` that is strictly smaller than `strength[i]` (or -1 if none). `rightIndices[i]` is the index of the first element to the right of `i` that is smaller than or equal to `strength[i]` (or `n` if none). These are efficiently found using a monotonic stack. The stack for `leftIndices` maintains indices of increasing strength. The stack for `rightIndices` also maintains indices of increasing strength, but the comparison for popping elements and the iteration direction are adjusted to correctly handle duplicate minimums and ensure `strength[i]` is the "rightmost" minimum if duplicates exist in its range.
 * 2. Calculate a prefix sum array `prefixSumArray`. `prefixSumArray[x]` stores the sum of `strength[0...x-1]`. This allows `sum(strength[j...k])` to be computed as `prefixSumArray[k+1] - prefixSumArray[j]` in O(1) time.
 * 3. Calculate a prefix sum of prefix sum array `prefixSumOfPrefixSumArray`. `prefixSumOfPrefixSumArray[x]` stores the sum of `prefixSumArray[0...x-1]`. This helps calculate sums of `prefixSumArray` segments in O(1) time.
 * 4. Iterate through each `wizardIndex` from `0` to `n-1`. For each `strength[wizardIndex]`:
 *    a. Determine its effective left boundary `leftBound` (`leftIndices[wizardIndex] + 1`) and right boundary `rightBound` (`rightIndices[wizardIndex] - 1`).
 *    b. Calculate `leftCountValue` (number of possible start indices `j` from `leftBound` to `wizardIndex`) and `rightCountValue` (number of possible end indices `k` from `wizardIndex` to `rightBound`).
 *    c. Use `prefixSumOfPrefixSumArray` to compute two key sums:
 *       - `sumOfRightPrefixSums`: Represents `sum_{k=wizardIndex+1}^{rightBound+1} prefixSumArray[k]`. This is `prefixSumOfPrefixSumArray[rightBound + 2] - prefixSumOfPrefixSumArray[wizardIndex + 1]`.
 *       - `sumOfLeftPrefixSums`: Represents `sum_{j=leftBound}^{wizardIndex} prefixSumArray[j]`. This is `prefixSumOfPrefixSumArray[wizardIndex + 1] - prefixSumOfPrefixSumArray[leftBound]`.
 *    d. The total sum of all subarrays where `strength[wizardIndex]` is the minimum, within its valid range, is given by the formula: `(leftCountValue * sumOfRightPrefixSums) - (rightCountValue * sumOfLeftPrefixSums)`. All intermediate calculations are done with BigInt and modulo `1e9 + 7`.
 *    e. Multiply this total subarray sum by `strength[wizardIndex]` (which is the minimum) and add to the `overallTotalStrength`.
 * 5. Return the final `overallTotalStrength` modulo `1e9 + 7`.
 * Dry Run: strength = [1, 2, 3]
 * n = 3, mod = 1e9 + 7
 * 1. Monotonic Stacks:
 *    leftIndices = [-1, 0, 1]
 *    rightIndices = [3, 3, 3]
 * 2. Prefix Sums:
 *    prefixSumArray = [0n, 1n, 3n, 6n] (sums for [ [], [1], [1,2], [1,2,3] ])
 * 3. Prefix Sums of Prefix Sums:
 *    prefixSumOfPrefixSumArray = [0n, 0n, 1n, 4n, 10n] (sums for [ [], [0], [0,1], [0,1,3], [0,1,3,6] ])
 * 4. Calculate total strength:
 *    overallTotalStrength = 0n
 *    - wizardIndex = 0 (strength[0] = 1):
 *      wizardStrength = 1n
 *      leftBound = -1 + 1 = 0
 *      rightBound = 3 - 1 = 2
 *      leftCountValue = 0 - 0 + 1 = 1n
 *      rightCountValue = 2 - 0 + 1 = 3n
 *      sumOfRightPrefixSums = (prefixSumOfPrefixSumArray[2+2] - prefixSumOfPrefixSumArray[0+1]) = (10n - 0n) = 10n
 *      sumOfLeftPrefixSums = (prefixSumOfPrefixSumArray[0+1] - prefixSumOfPrefixSumArray[0]) = (0n - 0n) = 0n
 *      innerSum = (1n * 10n - 3n * 0n) % mod = 10n
 *      currentContribution = (1n * 10n) % mod = 10n
 *      overallTotalStrength = (0n + 10n) % mod = 10n
 *    - wizardIndex = 1 (strength[1] = 2):
 *      wizardStrength = 2n
 *      leftBound = 0 + 1 = 1
 *      rightBound = 3 - 1 = 2
 *      leftCountValue = 1 - 1 + 1 = 1n
 *      rightCountValue = 2 - 1 + 1 = 2n
 *      sumOfRightPrefixSums = (prefixSumOfPrefixSumArray[2+2] - prefixSumOfPrefixSumArray[1+1]) = (10n - 1n) = 9n
 *      sumOfLeftPrefixSums = (prefixSumOfPrefixSumArray[1+1] - prefixSumOfPrefixSumArray[1]) = (1n - 0n) = 1n
 *      innerSum = (1n * 9n - 2n * 1n) % mod = 7n
 *      currentContribution = (2n * 7n) % mod = 14n
 *      overallTotalStrength = (10n + 14n) % mod = 24n
 *    - wizardIndex = 2 (strength[2] = 3):
 *      wizardStrength = 3n
 *      leftBound = 1 + 1 = 2
 *      rightBound = 3 - 1 = 2
 *      leftCountValue = 2 - 2 + 1 = 1n
 *      rightCountValue = 2 - 2 + 1 = 1n
 *      sumOfRightPrefixSums = (prefixSumOfPrefixSumArray[2+2] - prefixSumOfPrefixSumArray[2+1]) = (10n - 4n) = 6n
 *      sumOfLeftPrefixSums = (prefixSumOfPrefixSumArray[2+1] - prefixSumOfPrefixSumArray[2]) = (4n - 1n) = 3n
 *      innerSum = (1n * 6n - 1n * 3n) % mod = 3n
 *      currentContribution = (3n * 3n) % mod = 9n
 *      overallTotalStrength = (24n + 9n) % mod = 33n
 * 5. Return 33.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var totalStrength = function (strength) {
  const lengthOfStrength = strength.length;
  const modulusValue = BigInt(1e9 + 7);

  const leftBoundaryIndices = new Array(lengthOfStrength).fill(-1);
  const rightBoundaryIndices = new Array(lengthOfStrength).fill(
    lengthOfStrength,
  );

  const processingStack = [];

  for (
    let currentPosition = 0;
    currentPosition < lengthOfStrength;
    ++currentPosition
  ) {
    while (
      processingStack.length > 0 &&
      strength[processingStack[processingStack.length - 1]] >=
        strength[currentPosition]
    ) {
      processingStack.pop();
    }
    if (processingStack.length > 0) {
      leftBoundaryIndices[currentPosition] =
        processingStack[processingStack.length - 1];
    }
    processingStack.push(currentPosition);
  }

  processingStack.length = 0;

  for (
    let currentPositionInverse = lengthOfStrength - 1;
    currentPositionInverse >= 0;
    --currentPositionInverse
  ) {
    while (
      processingStack.length > 0 &&
      strength[processingStack[processingStack.length - 1]] >
        strength[currentPositionInverse]
    ) {
      processingStack.pop();
    }
    if (processingStack.length > 0) {
      rightBoundaryIndices[currentPositionInverse] =
        processingStack[processingStack.length - 1];
    }
    processingStack.push(currentPositionInverse);
  }

  const cumulativeStrengthSums = new Array(lengthOfStrength + 1).fill(0n);
  for (let sumIndex = 0; sumIndex < lengthOfStrength; ++sumIndex) {
    cumulativeStrengthSums[sumIndex + 1] =
      cumulativeStrengthSums[sumIndex] + BigInt(strength[sumIndex]);
  }

  const cumulativePrefixSums = new Array(lengthOfStrength + 2).fill(0n);
  for (
    let prefixSumIndex = 0;
    prefixSumIndex < lengthOfStrength + 1;
    ++prefixSumIndex
  ) {
    cumulativePrefixSums[prefixSumIndex + 1] =
      cumulativePrefixSums[prefixSumIndex] +
      cumulativeStrengthSums[prefixSumIndex];
  }

  let finalTotalStrength = 0n;
  for (
    let wizardIdentifier = 0;
    wizardIdentifier < lengthOfStrength;
    ++wizardIdentifier
  ) {
    const individualStrength = BigInt(strength[wizardIdentifier]);
    const lowerBound = leftBoundaryIndices[wizardIdentifier] + 1;
    const upperBound = rightBoundaryIndices[wizardIdentifier] - 1;

    const countLeftSubarrays = BigInt(wizardIdentifier - lowerBound + 1);
    const countRightSubarrays = BigInt(upperBound - wizardIdentifier + 1);

    const sumOfPrefixSumsRight =
      (cumulativePrefixSums[upperBound + 2] -
        cumulativePrefixSums[wizardIdentifier + 1] +
        modulusValue) %
      modulusValue;
    const sumOfPrefixSumsLeft =
      (cumulativePrefixSums[wizardIdentifier + 1] -
        cumulativePrefixSums[lowerBound] +
        modulusValue) %
      modulusValue;

    const componentOne =
      (sumOfPrefixSumsRight * countLeftSubarrays) % modulusValue;
    const componentTwo =
      (sumOfPrefixSumsLeft * countRightSubarrays) % modulusValue;

    const totalSubarraySums =
      (componentOne - componentTwo + modulusValue) % modulusValue;
    const currentWizardContribution =
      (individualStrength * totalSubarraySums) % modulusValue;

    finalTotalStrength =
      (finalTotalStrength + currentWizardContribution) % modulusValue;
  }

  return Number(finalTotalStrength);
};
