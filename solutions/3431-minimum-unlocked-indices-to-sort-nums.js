/**
 * Minimum Unlocked Indices to Sort Nums
 * Intuition: The array only contains 1, 2, 3. Adjacent swaps can sort it iff no 3 sits left of a 1. Locked 2s between a later 1, and locked 3s between a later 2, block those swaps.
 * Approach: 1. If the first 3 is left of the last 1, return -1. 2. Count locked indices in [first2, last1). 3. Count locked indices in [first3, last2).
 * Dry Run: nums = [1,2,1,3], locked = [0,1,0,0]. first2=1, last1=2 → unlock index 1 if locked. first3=3, last2=1 → empty range. Answer 1.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

var minUnlockedIndices = function (nums, locked) {
  const findFirst = (target) => {
    for (let index = 0; index < nums.length; index++) {
      if (nums[index] === target) {
        return index;
      }
    }
    return -1;
  };

  const findLast = (target) => {
    for (let index = nums.length - 1; index >= 0; index--) {
      if (nums[index] === target) {
        return index;
      }
    }
    return -1;
  };

  const first2 = findFirst(2);
  const first3 = findFirst(3);
  const last1 = findLast(1);
  const last2 = findLast(2);

  if (first3 !== -1 && last1 !== -1 && first3 < last1) {
    return -1;
  }

  let unlocked = 0;
  if (first2 !== -1 && last1 !== -1) {
    for (let index = first2; index < last1; index++) {
      if (locked[index] === 1) {
        unlocked++;
      }
    }
  }
  if (first3 !== -1 && last2 !== -1) {
    for (let index = first3; index < last2; index++) {
      if (locked[index] === 1) {
        unlocked++;
      }
    }
  }
  return unlocked;
};
