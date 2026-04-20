/**
 * K Concatenation Maximum Sum
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
    0,
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
