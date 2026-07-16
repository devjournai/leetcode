/**
 * Sum of GCD of Formed Pairs
 * Intuition: The problem involves three main phases: first, constructing an array of GCDs based on prefix maximums; second, sorting this array; and third, pairing the smallest with the largest elements from the sorted array and summing their GCDs. The challenge lies in accurately implementing each step and handling the pairing logic, especially for an odd number of elements.
 * Approach:
 * 1. Define a helper function `calculateGcd(a, b)` using the Euclidean algorithm to find the greatest common divisor of two numbers.
 * 2. Initialize an empty array `prefixGcd` to store the calculated GCDs and a variable `currentMax = 0` to track the running maximum of elements encountered so far in `nums`. Since `nums[i] >= 1`, initializing `currentMax` to `0` or `nums[0]` is safe.
 * 3. Iterate through the input array `nums` from left to right:
 *    a. In each iteration `i`, update `currentMax` by taking `Math.max(currentMax, nums[i])`. This ensures `currentMax` always holds `max(nums[0], ..., nums[i])`.
 *    b. Calculate `gcd(nums[i], currentMax)` and append this value to the `prefixGcd` array.
 * 4. After `prefixGcd` is fully constructed, sort it in non-decreasing order.
 * 5. Initialize a variable `totalGcdSum = 0`.
 * 6. Use two pointers, `left` initialized to `0` and `right` initialized to `prefixGcd.length - 1`.
 * 7. Loop while `left < right`:
 *    a. Compute `gcd(prefixGcd[left], prefixGcd[right])`.
 *    b. Add this computed GCD to `totalGcdSum`.
 *    c. Increment `left` and decrement `right` to move towards the center of the array.
 * 8. When the loop terminates (`left >= right`), all possible pairs have been formed. If `prefixGcd.length` was odd, the middle element is naturally left unpaired and ignored, as per the problem statement.
 * 9. Return `totalGcdSum`.
 * Dry Run:
 * Input: nums = [2,6,4]
 * 1. `calculateGcd` function is available.
 * 2. `prefixGcd = []`, `currentMax = 0`, `n = 3`.
 * 3. Construct `prefixGcd`:
 *    - i=0: `nums[0]=2`. `currentMax = Math.max(0,2) = 2`. `prefixGcd.push(calculateGcd(2,2)) = 2`. `prefixGcd = [2]`
 *    - i=1: `nums[1]=6`. `currentMax = Math.max(2,6) = 6`. `prefixGcd.push(calculateGcd(6,6)) = 6`. `prefixGcd = [2,6]`
 *    - i=2: `nums[2]=4`. `currentMax = Math.max(6,4) = 6`. `prefixGcd.push(calculateGcd(4,6)) = 2`. `prefixGcd = [2,6,2]`
 * 4. Sort `prefixGcd`: `[2,2,6]`.
 * 5. `totalGcdSum = 0`.
 * 6. `left = 0`, `right = 2`.
 * 7. Pairing loop:
 *    - `left=0`, `right=2`. `left < right` (0 < 2) is true.
 *      - `pairGcd = calculateGcd(prefixGcd[0], prefixGcd[2]) = calculateGcd(2,6) = 2`.
 *      - `totalGcdSum = 0 + 2 = 2`.
 *      - `left` becomes 1, `right` becomes 1.
 *    - `left=1`, `right=1`. `left < right` (1 < 1) is false. Loop terminates.
 * 8. Return `totalGcdSum = 2`. This matches Example 1.
 * Time Complexity: O(N log N + N log(maxVal))
 * Space Complexity: O(N)
 */
var gcdSum = function (nums) {
  function calculateGcd(a, b) {
    while (b !== 0) {
      let temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }

  const n = nums.length;
  const prefixGcd = new Array(n);
  let currentMax = 0;

  for (let i = 0; i < n; i++) {
    currentMax = Math.max(currentMax, nums[i]);
    prefixGcd[i] = calculateGcd(nums[i], currentMax);
  }

  prefixGcd.sort((a, b) => a - b);

  let totalGcdSum = 0;
  let left = 0;
  let right = n - 1;

  while (left < right) {
    totalGcdSum += calculateGcd(prefixGcd[left], prefixGcd[right]);
    left++;
    right--;
  }

  return totalGcdSum;
};
