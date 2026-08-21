/**
 * Maximum Subarray With Equal Products
 * Intuition: prod(subarray) == lcm * gcd iff the subarray is pairwise coprime in the "equal products" sense of the statement (no squared prime overlap). Values are tiny (≤10) so products stay bounded by 10! * 10.
 * Approach: 1. For every left index, grow right, tracking product, LCM, and GCD. 2. Stop if product exceeds 36288000. 3. When product === lcm * gcd, update max length.
 * Dry Run: nums = [1,2,1,2,1,1,1]. Two 2's make product 4 vs lcm*gcd 2, so skip; five 1's work. Answer 5.
 * Time Complexity: O(N^2)
 * Space Complexity: O(1)
 */

var maxLength = function (nums) {
  const gcd = (firstValue, secondValue) => {
    while (secondValue !== 0) {
      const remainder = firstValue % secondValue;
      firstValue = secondValue;
      secondValue = remainder;
    }
    return firstValue;
  };

  const lcm = (firstValue, secondValue) => {
    return (firstValue / gcd(firstValue, secondValue)) * secondValue;
  };

  const MAXIMUM_PRODUCT = 36288000;
  const length = nums.length;
  let longestLength = 0;

  for (let leftIndex = 0; leftIndex < length; leftIndex++) {
    let product = 1;
    let currentLcm = 1;
    let currentGcd = 0;
    for (let rightIndex = leftIndex; rightIndex < length; rightIndex++) {
      product *= nums[rightIndex];
      if (product > MAXIMUM_PRODUCT) {
        break;
      }
      currentLcm = lcm(currentLcm, nums[rightIndex]);
      currentGcd = gcd(currentGcd, nums[rightIndex]);
      if (product === currentLcm * currentGcd) {
        longestLength = Math.max(longestLength, rightIndex - leftIndex + 1);
      }
    }
  }

  return longestLength;
};
