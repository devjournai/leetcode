/**
 * Find In Mountain Array
 * Intuition: A mountain has one peak. Three binary searches (peak, ascending left, descending right) find the leftmost target because the left side is tried first.
 * Approach: 1. Binary search peak where a[mid]<a[mid+1] goes right else left. 2. Classic binary search on [0,peak]. 3. If missed, reverse binary search on [peak,n-1]. 4. Return index or -1.
 * Dry Run: mountain [1,2,3,4,5,3,1], target=3. Peak index 4 (value 5). Left search hits index 2 before the right 3.
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */
var findInMountainArray = function (target, mountainArr) {
  const arrayTotalLength = mountainArr.length();

  let peakSearchStart = 0;
  let peakSearchEnd = arrayTotalLength - 1;
  while (peakSearchStart < peakSearchEnd) {
    const peakSearchMid = Math.floor((peakSearchStart + peakSearchEnd) / 2);
    const peakMidValue = mountainArr.get(peakSearchMid);
    const peakNextValue = mountainArr.get(peakSearchMid + 1);
    if (peakMidValue < peakNextValue) {
      peakSearchStart = peakSearchMid + 1;
    } else {
      peakSearchEnd = peakSearchMid;
    }
  }
  const peakIndex = peakSearchStart;

  let ascSearchLeft = 0;
  let ascSearchRight = peakIndex;
  while (ascSearchLeft <= ascSearchRight) {
    const ascSearchMiddle = Math.floor((ascSearchLeft + ascSearchRight) / 2);
    const currentAscValue = mountainArr.get(ascSearchMiddle);
    if (currentAscValue === target) {
      return ascSearchMiddle;
    }
    if (currentAscValue < target) {
      ascSearchLeft = ascSearchMiddle + 1;
    } else {
      ascSearchRight = ascSearchMiddle - 1;
    }
  }

  let descSearchLeft = peakIndex;
  let descSearchRight = arrayTotalLength - 1;
  while (descSearchRight >= descSearchLeft) {
    const descSearchMiddle = Math.floor((descSearchLeft + descSearchRight) / 2);
    const currentDescValue = mountainArr.get(descSearchMiddle);
    if (currentDescValue === target) {
      return descSearchMiddle;
    }
    if (currentDescValue > target) {
      descSearchLeft = descSearchMiddle + 1;
    } else {
      descSearchRight = descSearchMiddle - 1;
    }
  }

  return -1;
};
