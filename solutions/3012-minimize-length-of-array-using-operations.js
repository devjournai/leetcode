/**
 * Minimize Length Of Array Using Operations
 * Intuition: gcd of the array is the smallest value you can produce. If the minimum already appears more than once, you can keep reducing until one min remains... Actually: you replace two numbers with their remainder. The final length is 1 if min occurs once, else if some value is not a multiple of min you can still get smaller than min which is impossible so min is gcd. Result: count of minima; if any nums[i] % min != 0 answer is 1, else ceil(countMin/2).
 * Approach: 1. Find global minimum. 2. If any element is not divisible by min, return 1. 3. Else return ceil(frequency(min) / 2).
 * Dry Run:
 *   nums = [1,4,3,1] min=1 appears twice, all divisible, answer 1.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minimumArrayLength = function (nums) {
  const minValue = Math.min(...nums);
  for (const currentValue of nums) {
    if (currentValue % minValue !== 0) {
      return 1;
    }
  }
  let minFrequency = 0;
  for (const currentValue of nums) {
    if (currentValue === minValue) {
      minFrequency++;
    }
  }
  return Math.ceil(minFrequency / 2);
};
