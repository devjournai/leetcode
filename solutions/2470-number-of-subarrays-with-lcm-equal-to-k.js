/**
 * Number Of Subarrays With Lcm Equal To K
 * Intuition: Iterate through all possible subarrays. For each subarray, calculate its Least Common Multiple (LCM) cumulatively. If the LCM equals K, increment a counter. Optimise by stopping early if the current LCM exceeds K, as it will only grow or stay the same with more elements.
 * Approach: 1. Initialize a counter for valid subarrays. 2. Use a nested loop structure, where an outer `while` loop sets the starting element of a subarray (`mainPointer`) and an inner `while` loop extends the subarray to its end (`secondaryPointer`). 3. Inside the inner loop, maintain a running LCM for the current subarray, initializing it to 1 (since lcm(1, x) = x). 4. For each element added to the subarray, update the running LCM using a helper function. 5. If the running LCM ever exceeds `k`, or if an individual element `currentValue` is greater than `k`, break the inner loop (no further elements will make the LCM equal to `k`). 6. If the running LCM exactly equals `k`, increment the counter. 7. Define helper functions for `calculateGreatestCommonDivisor` and `determineLeastCommonMultiple`.
 * Dry Run: nums = [2, 3, 4, 6], k = 12
 * totalValidSubarrays = 0
 *
 * mainPointer = 0 (nums[0] = 2)
 *   secondaryPointer = 0 (nums[0] = 2)
 *     currentValue = 2. 2 <= 12.
 *     currentLcmValue = determineLeastCommonMultiple(1, 2) = 2. 2 <= 12. 2 !== 12.
 *   secondaryPointer = 1 (nums[1] = 3)
 *     currentValue = 3. 3 <= 12.
 *     currentLcmValue = determineLeastCommonMultiple(2, 3) = 6. 6 <= 12. 6 !== 12.
 *   secondaryPointer = 2 (nums[2] = 4)
 *     currentValue = 4. 4 <= 12.
 *     currentLcmValue = determineLeastCommonMultiple(6, 4) = 12. 12 <= 12. 12 === 12. totalValidSubarrays = 1. (Subarray [2,3,4])
 *   secondaryPointer = 3 (nums[3] = 6)
 *     currentValue = 6. 6 <= 12.
 *     currentLcmValue = determineLeastCommonMultiple(12, 6) = 12. 12 <= 12. 12 === 12. totalValidSubarrays = 2. (Subarray [2,3,4,6])
 *   secondaryPointer = 4. Loop ends.
 *
 * mainPointer = 1 (nums[1] = 3)
 *   secondaryPointer = 1 (nums[1] = 3)
 *     currentValue = 3. 3 <= 12.
 *     currentLcmValue = determineLeastCommonMultiple(1, 3) = 3. 3 <= 12. 3 !== 12.
 *   secondaryPointer = 2 (nums[2] = 4)
 *     currentValue = 4. 4 <= 12.
 *     currentLcmValue = determineLeastCommonMultiple(3, 4) = 12. 12 <= 12. 12 === 12. totalValidSubarrays = 3. (Subarray [3,4])
 *   secondaryPointer = 3 (nums[3] = 6)
 *     currentValue = 6. 6 <= 12.
 *     currentLcmValue = determineLeastCommonMultiple(12, 6) = 12. 12 <= 12. 12 === 12. totalValidSubarrays = 4. (Subarray [3,4,6])
 *   secondaryPointer = 4. Loop ends.
 *
 * mainPointer = 2 (nums[2] = 4)
 *   secondaryPointer = 2 (nums[2] = 4)
 *     currentValue = 4. 4 <= 12.
 *     currentLcmValue = determineLeastCommonMultiple(1, 4) = 4. 4 <= 12. 4 !== 12.
 *   secondaryPointer = 3 (nums[3] = 6)
 *     currentValue = 6. 6 <= 12.
 *     currentLcmValue = determineLeastCommonMultiple(4, 6) = 12. 12 <= 12. 12 === 12. totalValidSubarrays = 5. (Subarray [4,6])
 *   secondaryPointer = 4. Loop ends.
 *
 * mainPointer = 3 (nums[3] = 6)
 *   secondaryPointer = 3 (nums[3] = 6)
 *     currentValue = 6. 6 <= 12.
 *     currentLcmValue = determineLeastCommonMultiple(1, 6) = 6. 6 <= 12. 6 !== 12.
 *   secondaryPointer = 4. Loop ends.
 *
 * mainPointer = 4. Loop ends.
 *
 * Return totalValidSubarrays = 5.
 * Time Complexity: O(N^2 * log(K))
 * Space Complexity: O(1)
 */
var subarrayLCM = function (nums, k) {
  let totalValidSubarrays = 0;
  let mainPointer = 0;

  while (mainPointer < nums.length) {
    let currentLcmValue = 1;
    let secondaryPointer = mainPointer;

    while (secondaryPointer < nums.length) {
      let currentValue = nums[secondaryPointer];

      if (currentValue > k) {
        break;
      }

      currentLcmValue = determineLeastCommonMultiple(
        currentLcmValue,
        currentValue,
      );

      if (currentLcmValue > k) {
        break;
      }

      if (currentLcmValue === k) {
        totalValidSubarrays++;
      }
      secondaryPointer++;
    }
    mainPointer++;
  }

  return totalValidSubarrays;

  function calculateGreatestCommonDivisor(firstValue, secondValue) {
    let remainderHolder;
    while (secondValue !== 0) {
      remainderHolder = firstValue % secondValue;
      firstValue = secondValue;
      secondValue = remainderHolder;
    }
    return firstValue;
  }

  function determineLeastCommonMultiple(numberOne, numberTwo) {
    if (numberOne === 0 || numberTwo === 0) {
      return 0;
    }
    let productOfNumbers = numberOne * numberTwo;
    let commonDivisor = calculateGreatestCommonDivisor(numberOne, numberTwo);
    return productOfNumbers / commonDivisor;
  }
};
