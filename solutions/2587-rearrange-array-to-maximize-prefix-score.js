/**
 * Rearrange Array To Maximize Prefix Score
 * Intuition: To maximize the number of positive prefix sums, we should prioritize adding larger numbers first to keep the running sum positive for as long as possible. Sorting the array in descending order ensures that we always consider the largest available number next, maximizing the chance of extending the positive prefix sequence. Once a prefix sum becomes non-positive, any subsequent additions from smaller or negative remaining numbers will likely not make it positive again, making further iteration unproductive.
 * Approach: 1. Sort the input array `nums` in descending order. This places the largest elements at the beginning. 2. Initialize a `currentTotalSum` to zero and a `scoreCount` to zero. 3. Iterate through the sorted array. In each step, add the current number to `currentTotalSum`. 4. If `currentTotalSum` becomes positive, increment `scoreCount`. 5. If `currentTotalSum` becomes zero or negative, stop the iteration, as adding smaller or negative numbers from this point on will not help in achieving more positive prefix sums. 6. Return `scoreCount`.
 * Dry Run: nums = [-2, -3, 0, 1]
 * 1. Sort nums descending: [1, 0, -2, -3]
 * 2. Initialize currentTotalSum = 0, scoreCount = 0.
 * 3. Iterate:
 *    - elementValue = 1: currentTotalSum = 0 + 1 = 1. Since 1 > 0, scoreCount = 1.
 *    - elementValue = 0: currentTotalSum = 1 + 0 = 1. Since 1 > 0, scoreCount = 2.
 *    - elementValue = -2: currentTotalSum = 1 + (-2) = -1. Since -1 <= 0, break loop.
 * 4. Return scoreCount = 2.
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */
var maxScore = function (nums) {
  nums.sort((valueA, valueB) => valueB - valueA);

  let currentTotalSum = 0;
  let scoreCount = 0;

  for (const elementValue of nums) {
    currentTotalSum += elementValue;
    if (currentTotalSum > 0) {
      scoreCount++;
    } else {
      break;
    }
  }

  return scoreCount;
};
