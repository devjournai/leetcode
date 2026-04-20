/**
 * Next Permutation
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var nextPermutation = function (nums) {
  const localSwap = (arrItems, firstIdx, secondIdx) => {
    const temporaryValue = arrItems[firstIdx];
    arrItems[firstIdx] = arrItems[secondIdx];
    arrItems[secondIdx] = temporaryValue;
  };

  const localReverse = (arrElements, startPoint) => {
    let leftPointer = startPoint;
    let rightPointer = arrElements.length - 1;

    while (leftPointer < rightPointer) {
      localSwap(arrElements, leftPointer, rightPointer);
      leftPointer++;
      rightPointer--;
    }
  };

  let firstDecreasingIndex = -1;
  for (
    let loopCounterOne = nums.length - 2;
    loopCounterOne >= 0;
    loopCounterOne--
  ) {
    if (nums[loopCounterOne] < nums[loopCounterOne + 1]) {
      firstDecreasingIndex = loopCounterOne;
      break;
    }
  }

  if (firstDecreasingIndex === -1) {
    localReverse(nums, 0);
    return;
  }

  let swapCandidateIndex = -1;
  for (
    let loopCounterTwo = nums.length - 1;
    loopCounterTwo > firstDecreasingIndex;
    loopCounterTwo--
  ) {
    if (nums[loopCounterTwo] > nums[firstDecreasingIndex]) {
      swapCandidateIndex = loopCounterTwo;
      break;
    }
  }

  localSwap(nums, firstDecreasingIndex, swapCandidateIndex);
  localReverse(nums, firstDecreasingIndex + 1);
};
