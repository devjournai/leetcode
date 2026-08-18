/**
 * Sum of Digit Differences of All Pairs
 * Intuition: Digit differences add independently per decimal place. At one place, pairs with different digits contribute 1, which is freq[d] * (n - freq[d]) summed over digits, then halved because each pair is counted twice.
 * Approach: 1. Let digitSize be the number of digits of nums[0]. 2. For each place, count digits 0-9. 3. Add freq * (n - freq) for every digit. 4. After all places, divide the total by 2.
 * Dry Run: nums = [13, 23, 12]
 * - Ones: digits 3, 3, 2 -> differences 2
 * - Tens: digits 1, 2, 1 -> differences 2
 * - Answer = 4
 * Time Complexity: O(n * d) where d is the number of digits
 * Space Complexity: O(1)
 */
var sumDigitDifferences = function (nums) {
  const n = nums.length;
  const digitSize = String(nums[0]).length;
  let answer = 0;
  let denominator = 1;

  for (let place = 0; place < digitSize; place++) {
    const count = new Array(10).fill(0);
    for (const num of nums) {
      count[Math.floor(num / denominator) % 10]++;
    }
    for (const freq of count) {
      answer += freq * (n - freq);
    }
    denominator *= 10;
  }

  return answer / 2;
};
