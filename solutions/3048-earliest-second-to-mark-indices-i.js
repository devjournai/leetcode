/**
 * Earliest Second to Mark Indices I
 * Intuition: Marking is irreversible and each index should be marked at its last allowed second in a candidate prefix of changeIndices. Seconds that are not last-mark opportunities can decrement some nums[i]. Binary search the earliest second where this greedy schedule works.
 * Approach: 1. Binary search second in [0, m+1]. 2. For a candidate second, record the last occurrence of each index in changeIndices[0..second). 3. Scan those seconds: on a last occurrence, spend stored decrements to clear nums[index] and mark it; otherwise bank a decrement. 4. Feasible if every index is marked. 5. Return the minimum feasible second, or -1.
 * Dry Run: nums = [2, 2, 0], changeIndices = [2, 2, 2, 2, 3, 2, 2, 1]. At second 8 (1-based length 8) last marks are index 1 at t=7, index 2 at t=4, index 0 at t=7... actually 1-based changeIndices values. The binary search finds 8 as the earliest time all three indices can be reduced and marked.
 * Time Complexity: O(m log m)
 * Space Complexity: O(n)
 */
var earliestSecondToMarkIndices = function (nums, changeIndices) {
  let lowSecond = 0;
  let highSecond = changeIndices.length + 1;

  while (lowSecond < highSecond) {
    const midSecond = Math.floor((lowSecond + highSecond) / 2);
    if (canMarkAllIndices(nums, changeIndices, midSecond)) {
      highSecond = midSecond;
    } else {
      lowSecond = midSecond + 1;
    }
  }

  return lowSecond <= changeIndices.length ? lowSecond : -1;
};

function canMarkAllIndices(nums, changeIndices, secondCount) {
  const lastSecondByIndex = new Array(nums.length).fill(-1);

  for (let secondIndex = 0; secondIndex < secondCount; secondIndex++) {
    lastSecondByIndex[changeIndices[secondIndex] - 1] = secondIndex;
  }

  let markedIndexCount = 0;
  let availableDecrements = 0;

  for (let secondIndex = 0; secondIndex < secondCount; secondIndex++) {
    const numsIndex = changeIndices[secondIndex] - 1;
    if (secondIndex === lastSecondByIndex[numsIndex]) {
      if (nums[numsIndex] > availableDecrements) {
        return false;
      }
      availableDecrements -= nums[numsIndex];
      markedIndexCount++;
    } else {
      availableDecrements++;
    }
  }

  return markedIndexCount === nums.length;
}
