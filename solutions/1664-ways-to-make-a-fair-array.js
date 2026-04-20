/**
 * Ways To Make A Fair Array
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var waysToMakeFair = function (nums) {
  const inputNumbers = nums;
  const arrayLength = inputNumbers.length;

  const prefixEvenSums = new Array(arrayLength).fill(0);
  const prefixOddSums = new Array(arrayLength).fill(0);

  for (
    let currentPosition = 0;
    currentPosition < arrayLength;
    currentPosition++
  ) {
    if (currentPosition > 0) {
      prefixEvenSums[currentPosition] = prefixEvenSums[currentPosition - 1];
      prefixOddSums[currentPosition] = prefixOddSums[currentPosition - 1];
    }
    if (currentPosition % 2 === 0) {
      prefixEvenSums[currentPosition] += inputNumbers[currentPosition];
    } else {
      prefixOddSums[currentPosition] += inputNumbers[currentPosition];
    }
  }

  const suffixEvenSums = new Array(arrayLength).fill(0);
  const suffixOddSums = new Array(arrayLength).fill(0);

  for (
    let backwardsPosition = arrayLength - 1;
    backwardsPosition >= 0;
    backwardsPosition--
  ) {
    if (backwardsPosition < arrayLength - 1) {
      suffixEvenSums[backwardsPosition] = suffixEvenSums[backwardsPosition + 1];
      suffixOddSums[backwardsPosition] = suffixOddSums[backwardsPosition + 1];
    }
    if (backwardsPosition % 2 === 0) {
      suffixEvenSums[backwardsPosition] += inputNumbers[backwardsPosition];
    } else {
      suffixOddSums[backwardsPosition] += inputNumbers[backwardsPosition];
    }
  }

  let validRemovalsCount = 0;

  for (let candidateIndex = 0; candidateIndex < arrayLength; candidateIndex++) {
    let currentLeftEvenSum = 0;
    let currentLeftOddSum = 0;
    if (candidateIndex > 0) {
      currentLeftEvenSum = prefixEvenSums[candidateIndex - 1];
      currentLeftOddSum = prefixOddSums[candidateIndex - 1];
    }

    let currentRightEvenSum = 0;
    let currentRightOddSum = 0;
    if (candidateIndex < arrayLength - 1) {
      currentRightEvenSum = suffixEvenSums[candidateIndex + 1];
      currentRightOddSum = suffixOddSums[candidateIndex + 1];
    }

    const effectiveEvenSum = currentLeftEvenSum + currentRightOddSum;
    const effectiveOddSum = currentLeftOddSum + currentRightEvenSum;

    if (effectiveEvenSum === effectiveOddSum) {
      validRemovalsCount++;
    }
  }

  return validRemovalsCount;
};
