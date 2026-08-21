/**
 * Next Permutation
 * Intuition: Find the rightmost ascent `firstDecreasingIndex`, swap it with the next larger suffix value, then reverse the suffix so it becomes the smallest increasing tail—the next lexicographic permutation (or reverse the whole array if already max).
 * Approach: 1. Scan from the right for `nums[i] < nums[i+1]`. 2. If none, `localReverse` the entire array and return. 3. From the right, find `swapCandidateIndex` where `nums[j] > nums[firstDecreasingIndex]`. 4. `localSwap` those two, then `localReverse` from `firstDecreasingIndex + 1`.
 * Dry Run: nums = [1, 3, 2].
 *   - firstDecreasingIndex=0 (1<3). swapCandidateIndex=2 (2>1). Swap → [2,3,1]. Reverse suffix → [2,1,3].
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
