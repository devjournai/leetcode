/**
 * Find The Smallest Divisor Given A Threshold
 * Intuition: Sum of ceils decreases as the divisor grows, so binary search the smallest divisor whose ceil-sum is <= threshold.
 * Approach: 1. Search [1, max(nums)]. 2. Mid candidateDivisor: sum ceil(num/divisor). 3. If sum <= threshold search left (upperBound=mid) else lowerBound=mid+1. 4. Return lowerBound.
 * Dry Run: nums=[1,2,5,9], threshold=6
 *   divisor 5: ceil 1+1+1+2=5 <=6. divisor 4: 1+1+2+3=7 >6. Answer 5.
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
