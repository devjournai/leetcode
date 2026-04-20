/**
 * Find The Smallest Divisor Given A Threshold
 * Time Complexity: O(N * log(Max_Num))
 * Space Complexity: O(1)
 */
var smallestDivisor = function (nums, threshold) {
  let lowerBound = 1;
  let highestPossibleValue = 0;

  for (const valueEntry of nums) {
    if (valueEntry > highestPossibleValue) {
      highestPossibleValue = valueEntry;
    }
  }

  let upperBound = highestPossibleValue;

  while (lowerBound < upperBound) {
    const candidateDivisor = Math.floor((lowerBound + upperBound) / 2);
    let cumulativeSum = 0;

    for (const numberEntity of nums) {
      cumulativeSum += Math.ceil(numberEntity / candidateDivisor);
    }

    if (cumulativeSum <= threshold) {
      upperBound = candidateDivisor;
    } else {
      lowerBound = candidateDivisor + 1;
    }
  }

  return lowerBound;
};
