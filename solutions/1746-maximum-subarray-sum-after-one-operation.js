/**
 * Maximum Subarray Sum After One Operation
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
      optionMaxWithOpExtendWithOpDontSquareCurrent,
    );

    currentMaxSumNoOp = nextMaxSumNoOp;
    currentMaxSumWithOp = nextMaxSumWithOp;
    absoluteMaximum = Math.max(absoluteMaximum, currentMaxSumWithOp);
  }

  return absoluteMaximum;
};
