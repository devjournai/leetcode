/**
 * Number Of Sub Arrays With Odd Sum
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var numOfSubarrays = function (arr) {
  const moduloDivider = 1000000007;
  let countEvenPrefixSums = 1;
  let countOddPrefixSums = 0;
  let totalOddSubarrays = 0;
  let currentRunningSum = 0;

  for (let numberValue of arr) {
    currentRunningSum += numberValue;

    if (currentRunningSum % 2 === 1) {
      totalOddSubarrays =
        (totalOddSubarrays + countEvenPrefixSums) % moduloDivider;
      countOddPrefixSums++;
    } else {
      totalOddSubarrays =
        (totalOddSubarrays + countOddPrefixSums) % moduloDivider;
      countEvenPrefixSums++;
    }
  }

  return totalOddSubarrays;
};
