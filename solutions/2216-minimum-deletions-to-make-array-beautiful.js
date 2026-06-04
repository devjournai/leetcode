/**
 * Minimum Deletions To Make Array Beautiful
 * Intuition: To minimize deletions, we want to maximize the number of elements kept. We can greedily build a beautiful subsequence by iterating through the original array. For each element, we decide whether to include it based on its potential effective index (even or odd) and the previously kept element.
 * Approach: 1. Initialize `deletionsTotal` to count deleted elements and `effectiveLengthCounter` to track the length of the beautiful array being constructed. A `lastStoredValue` variable keeps track of the element placed at the last even effective index. 2. Iterate through the input `nums` array. 3. If `effectiveLengthCounter` is even, the current element is considered for an even index in our beautiful array. We always keep it, update `lastStoredValue`, and increment `effectiveLengthCounter`. 4. If `effectiveLengthCounter` is odd, the current element is considered for an odd index. We check if it's equal to `lastStoredValue`. If it is, we must delete it to satisfy the beauty condition (`nums[i] != nums[i+1]` for even `i`), so we increment `deletionsTotal`. If it's not equal, we keep it, update `lastStoredValue`, and increment `effectiveLengthCounter`. 5. After iterating, if `effectiveLengthCounter` is odd, we must delete one more element to ensure the final beautiful array has an even length, so we increment `deletionsTotal`. 6. Return `deletionsTotal`.
 * Dry Run: nums = [1,1,2,3,4,4]
 *   Initialize: deletionsTotal = 0, effectiveLengthCounter = 0, lastStoredValue = null
 *   arrayPointer = 0, currentArrayElement = 1: effectiveLengthCounter (0) is even. lastStoredValue = 1, effectiveLengthCounter = 1.
 *   arrayPointer = 1, currentArrayElement = 1: effectiveLengthCounter (1) is odd. currentArrayElement (1) === lastStoredValue (1). deletionsTotal = 1.
 *   arrayPointer = 2, currentArrayElement = 2: effectiveLengthCounter (1) is odd. currentArrayElement (2) !== lastStoredValue (1). lastStoredValue = 2, effectiveLengthCounter = 2.
 *   arrayPointer = 3, currentArrayElement = 3: effectiveLengthCounter (2) is even. lastStoredValue = 3, effectiveLengthCounter = 3.
 *   arrayPointer = 4, currentArrayElement = 4: effectiveLengthCounter (3) is odd. currentArrayElement (4) !== lastStoredValue (3). lastStoredValue = 4, effectiveLengthCounter = 4.
 *   arrayPointer = 5, currentArrayElement = 4: effectiveLengthCounter (4) is even. lastStoredValue = 4, effectiveLengthCounter = 5.
 *   Loop ends.
 *   Final check: effectiveLengthCounter (5) is odd. deletionsTotal = 1 + 1 = 2.
 *   Return 2.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minDeletion = function (nums) {
  let deletionsTotal = 0;
  let effectiveLengthCounter = 0;
  let lastStoredValue = null;

  for (let arrayPointer = 0; arrayPointer < nums.length; arrayPointer++) {
    const currentArrayElement = nums[arrayPointer];

    if (effectiveLengthCounter % 2 === 0) {
      lastStoredValue = currentArrayElement;
      effectiveLengthCounter++;
    } else {
      if (currentArrayElement === lastStoredValue) {
        deletionsTotal++;
      } else {
        lastStoredValue = currentArrayElement;
        effectiveLengthCounter++;
      }
    }
  }

  if (effectiveLengthCounter % 2 !== 0) {
    deletionsTotal++;
  }

  return deletionsTotal;
};
