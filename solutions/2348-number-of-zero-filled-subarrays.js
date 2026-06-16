/**
 * Number Of Zero Filled Subarrays
 * Intuition: Subarrays of zeros contribute to the total count based on their length. A streak of 'k' consecutive zeros contains 'k * (k + 1) / 2' zero-filled subarrays. The approach effectively calculates this sum iteratively by adding the current streak length for each zero encountered.
 * Approach: 1. Initialize `totalZeroSubarrays` to zero to store the final count. 2. Initialize `consecutiveZeros` to zero to track the current length of a continuous streak of zeros. 3. Iterate through the input array `numsInput` using a standard `for` loop with an index. 4. For each element, check if it is zero. 5. If the element is zero, increment `consecutiveZeros` by one, then add the new `consecutiveZeros` value to `totalZeroSubarrays`. 6. If the element is not zero, reset `consecutiveZeros` back to zero. 7. After iterating through all elements, return `totalZeroSubarrays`.
 * Dry Run: numsInput = [0,0,0,2,0]
 *   Initialize: totalZeroSubarrays = 0, consecutiveZeros = 0
 *   indexValue = 0, currentValue = 0: consecutiveZeros becomes 1. totalZeroSubarrays becomes 0 + 1 = 1.
 *   indexValue = 1, currentValue = 0: consecutiveZeros becomes 2. totalZeroSubarrays becomes 1 + 2 = 3.
 *   indexValue = 2, currentValue = 0: consecutiveZeros becomes 3. totalZeroSubarrays becomes 3 + 3 = 6.
 *   indexValue = 3, currentValue = 2: consecutiveZeros is reset to 0.
 *   indexValue = 4, currentValue = 0: consecutiveZeros becomes 1. totalZeroSubarrays becomes 6 + 1 = 7.
 *   Loop ends. Return totalZeroSubarrays = 7.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var zeroFilledSubarray = function (numsInput) {
  let totalZeroSubarrays = 0;
  let consecutiveZeros = 0;

  let arraySize = numsInput.length;
  for (
    let currentArrayIndex = 0;
    currentArrayIndex < arraySize;
    currentArrayIndex++
  ) {
    let currentElementValue = numsInput[currentArrayIndex];

    if (currentElementValue === 0) {
      consecutiveZeros++;
      totalZeroSubarrays += consecutiveZeros;
    } else {
      consecutiveZeros = 0;
    }
  }

  return totalZeroSubarrays;
};
