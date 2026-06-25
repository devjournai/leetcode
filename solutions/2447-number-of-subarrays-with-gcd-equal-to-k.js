/**
 * Number Of Subarrays With Gcd Equal To K
 * Intuition: For a subarray's greatest common divisor (GCD) to be equal to K, every element within that subarray must be a multiple of K. This key observation allows for significant pruning: if any element encountered is not a multiple of K, or if the running GCD for a subarray drops below K, that particular subarray extension path can be immediately terminated, as it can never achieve a GCD of K. We iterate through all potential starting points and extend subarrays, updating the GCD and applying these early termination conditions.
 * Approach: 1. Implement a `calculateGcd` helper function using the Euclidean algorithm (e.g., `while (b) { a %= b; [a, b] = [b, a]; } return a;`). 2. Initialize a counter `totalSubarraysFound` to 0. 3. Use an outer loop with `outerLoopIndex` to designate the start of a subarray, iterating from the beginning to the end of the `nums` array. 4. Inside the outer loop, initialize a `runningGcdValue` to 0 for each new subarray starting at `outerLoopIndex`. 5. Use an inner loop with `innerLoopIndex` to extend the current subarray from `outerLoopIndex` to the end of `nums`. 6. For each `currentElementValue` (`nums[innerLoopIndex]`), first check if it is divisible by `k`. If not (`currentElementValue % k !== 0`), then this element cannot be part of any subarray whose GCD is `k`, so `break` the inner loop and proceed to the next `outerLoopIndex`. 7. If `runningGcdValue` is 0, it means `currentElementValue` is the first (valid) element of the current subarray, so set `runningGcdValue = currentElementValue`. Otherwise, update `runningGcdValue = calculateGcd(runningGcdValue, currentElementValue)`. 8. If `runningGcdValue` is exactly equal to `k`, increment `totalSubarraysFound`. 9. If `runningGcdValue` becomes less than `k`, it cannot possibly become `k` again (GCD only decreases or stays the same), so `break` the inner loop. 10. After iterating through all possible subarrays, return `totalSubarraysFound`.
 * Dry Run: nums = [4, 6, 8], k = 2
 * totalSubarraysFound = 0
 *
 * calculateGcd(firstNumber, secondNumber) function defined.
 *
 * outerLoopIndex = 0 (current element at nums[0] is 4)
 *   runningGcdValue = 0 (reset for new outerLoopIndex)
 *   innerLoopIndex = 0 (currentElementValue = nums[0] = 4)
 *     4 % 2 !== 0 (false) - `4` is divisible by `2`
 *     runningGcdValue is 0, so runningGcdValue = 4
 *     runningGcdValue === k (4 === 2) (false)
 *     runningGcdValue < k (4 < 2) (false)
 *   innerLoopIndex = 1 (currentElementValue = nums[1] = 6)
 *     6 % 2 !== 0 (false) - `6` is divisible by `2`
 *     runningGcdValue is 4, so runningGcdValue = calculateGcd(4, 6) = 2
 *     runningGcdValue === k (2 === 2) (true) -> totalSubarraysFound = 1 (for subarray [4, 6])
 *     runningGcdValue < k (2 < 2) (false)
 *   innerLoopIndex = 2 (currentElementValue = nums[2] = 8)
 *     8 % 2 !== 0 (false) - `8` is divisible by `2`
 *     runningGcdValue is 2, so runningGcdValue = calculateGcd(2, 8) = 2
 *     runningGcdValue === k (2 === 2) (true) -> totalSubarraysFound = 2 (for subarray [4, 6, 8])
 *     runningGcdValue < k (2 < 2) (false)
 *
 * outerLoopIndex = 1 (current element at nums[1] is 6)
 *   runningGcdValue = 0 (reset for new outerLoopIndex)
 *   innerLoopIndex = 1 (currentElementValue = nums[1] = 6)
 *     6 % 2 !== 0 (false) - `6` is divisible by `2`
 *     runningGcdValue is 0, so runningGcdValue = 6
 *     runningGcdValue === k (6 === 2) (false)
 *     runningGcdValue < k (6 < 2) (false)
 *   innerLoopIndex = 2 (currentElementValue = nums[2] = 8)
 *     8 % 2 !== 0 (false) - `8` is divisible by `2`
 *     runningGcdValue is 6, so runningGcdValue = calculateGcd(6, 8) = 2
 *     runningGcdValue === k (2 === 2) (true) -> totalSubarraysFound = 3 (for subarray [6, 8])
 *     runningGcdValue < k (2 < 2) (false)
 *
 * outerLoopIndex = 2 (current element at nums[2] is 8)
 *   runningGcdValue = 0 (reset for new outerLoopIndex)
 *   innerLoopIndex = 2 (currentElementValue = nums[2] = 8)
 *     8 % 2 !== 0 (false) - `8` is divisible by `2`
 *     runningGcdValue is 0, so runningGcdValue = 8
 *     runningGcdValue === k (8 === 2) (false)
 *     runningGcdValue < k (8 < 2) (false)
 *
 * All loops complete. Return totalSubarraysFound = 3.
 *
 * Time Complexity: O(N^2 * log(MAX_NUM))
 * Space Complexity: O(1)
 */
var subarrayGCD = function (nums, k) {
  let totalSubarraysFound = 0;

  function calculateGcd(firstNumber, secondNumber) {
    while (secondNumber) {
      [firstNumber, secondNumber] = [secondNumber, firstNumber % secondNumber];
    }
    return firstNumber;
  }

  for (let outerLoopIndex = 0; outerLoopIndex < nums.length; outerLoopIndex++) {
    let runningGcdValue = 0;
    for (
      let innerLoopIndex = outerLoopIndex;
      innerLoopIndex < nums.length;
      innerLoopIndex++
    ) {
      let currentElementValue = nums[innerLoopIndex];

      if (currentElementValue % k !== 0) {
        break;
      }

      if (runningGcdValue === 0) {
        runningGcdValue = currentElementValue;
      } else {
        runningGcdValue = calculateGcd(runningGcdValue, currentElementValue);
      }

      if (runningGcdValue === k) {
        totalSubarraysFound++;
      } else if (runningGcdValue < k) {
        break;
      }
    }
  }

  return totalSubarraysFound;
};
