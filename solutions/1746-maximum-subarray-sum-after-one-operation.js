/**
 * Maximum Subarray Sum After One Operation
 * Intuition: Kadane with a second state that has already squared one element. Transition: start a new squared subarray, extend an unsquared one by squaring now, or extend an already-squared one by the raw value.
 * Approach: 1. Init no-op / with-op from nums[0] and nums[0]^2. 2. For each later element update `nextMaxSumNoOp` and `nextMaxSumWithOp` from the three options. 3. Track `absoluteMaximum` of the with-op state. 4. Return it.
 * Dry Run: nums = [2,-1,-4,-3]
 * Square -4 → 16; best subarray using that is 16 (or with neighbors). Answer 17 from 2 + (-1) + 16? 2-1+16=17. Yes.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var maxSumAfterOperation = function (nums) {
  const inputNumbers = nums;
  const arrayLength = inputNumbers.length;

  let firstElement = inputNumbers[0];
  let firstElementSquared = firstElement * firstElement;

  let currentMaxSumNoOp = firstElement;
  let currentMaxSumWithOp = firstElementSquared;
  let absoluteMaximum = firstElementSquared;

  for (let loopIndex = 1; loopIndex < arrayLength; loopIndex++) {
    let elementAtCurrentIndex = inputNumbers[loopIndex];
    let squaredElement = elementAtCurrentIndex * elementAtCurrentIndex;

    let optionMaxNoOpStartNew = elementAtCurrentIndex;
    let optionMaxNoOpExtend = currentMaxSumNoOp + elementAtCurrentIndex;
    let nextMaxSumNoOp = Math.max(optionMaxNoOpStartNew, optionMaxNoOpExtend);

    let optionMaxWithOpSquareCurrent = squaredElement;
    let optionMaxWithOpExtendNoOpSquareCurrent =
      currentMaxSumNoOp + squaredElement;
    let optionMaxWithOpExtendWithOpDontSquareCurrent =
      currentMaxSumWithOp + elementAtCurrentIndex;
    let nextMaxSumWithOp = Math.max(
      optionMaxWithOpSquareCurrent,
      optionMaxWithOpExtendNoOpSquareCurrent,
      optionMaxWithOpExtendWithOpDontSquareCurrent
    );

    currentMaxSumNoOp = nextMaxSumNoOp;
    currentMaxSumWithOp = nextMaxSumWithOp;
    absoluteMaximum = Math.max(absoluteMaximum, currentMaxSumWithOp);
  }

  return absoluteMaximum;
};
