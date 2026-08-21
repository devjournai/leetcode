/**
 * K Concatenation Maximum Sum
 * Intuition: Kadane on one copy covers k=1. For k≥2 the best subarray lives in at most two copies unless the whole array sum is positive, in which case extra full copies in the middle help.
 * Approach: 1. Kadane on arr. 2. If k=1 return it. 3. Kadane on arr+arr. 4. If total sum > 0 add (k-2)*sum to the two-copy Kadane; else return the two-copy Kadane. 5. Mod 10^9+7.
 * Dry Run: arr=[1,-2,1], k=5. One-copy Kadane=2, two-copy=2, sum=0 → 2.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var kConcatenationMaxSum = function (arr, k) {
  const moduloConstant = 10 ** 9 + 7;

  const calculateKadaneMaxSum = (inputArray) => {
    let currentKadaneSum = 0;
    let overallKadaneMax = 0;

    for (const elementValue of inputArray) {
      currentKadaneSum = Math.max(0, currentKadaneSum + elementValue);
      overallKadaneMax = Math.max(overallKadaneMax, currentKadaneSum);
    }
    return overallKadaneMax;
  };

  const maximumSubarraySingle = calculateKadaneMaxSum(arr);

  if (k === 1) {
    return maximumSubarraySingle;
  }

  const entireArraySum = arr.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const extendedArray = [...arr, ...arr];
  const maximumSubarrayDouble = calculateKadaneMaxSum(extendedArray);

  if (entireArraySum > 0) {
    const sumOfMiddleParts = BigInt(entireArraySum) * BigInt(k - 2);
    const potentialExpandedSum =
      BigInt(maximumSubarrayDouble) + sumOfMiddleParts;
    return Number(potentialExpandedSum % BigInt(moduloConstant));
  } else {
    return maximumSubarrayDouble;
  }
};
