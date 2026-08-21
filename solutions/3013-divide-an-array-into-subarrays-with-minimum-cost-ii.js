/**
 * Divide An Array Into Subarrays With Minimum Cost II
 * Intuition: The first subarray always starts at index 0, so the cost is nums[0] plus the sum of the smallest k - 1 values among a sliding window of length dist + 1 that starts at some index > 0. A Fenwick tree on compressed values tracks that window sum in log time.
 * Approach: 1. Rank every value after nums[0]. 2. Maintain Fenwick trees of counts and sums for the window nums[start..start + dist]. 3. Initialize the window as indices 1..dist+1 and record the sum of its smallest k - 1 values. 4. Slide the window to the right, updating the trees, and keep the minimum such sum. 5. Return nums[0] plus that minimum.
 * Dry Run: nums = [1, 3, 2, 6, 4, 2], k = 3, dist = 3
 *   1. Need nums[0] plus the two smallest values in some window of length 4 starting after index 0.
 *   2. First window [3, 2, 6, 4] has two smallest 2 + 3 = 5.
 *   3. Next window [2, 6, 4, 2] has two smallest 2 + 2 = 4.
 *   4. Answer is 1 + 4 = 5.
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
var minimumCost = function (nums, k, dist) {
  const arrayLength = nums.length;
  const selectedCount = k - 1;
  const uniqueSorted = [...new Set(nums.slice(1))].sort(
    (left, right) => left - right
  );
  const valueRank = new Map();
  for (let rankIndex = 0; rankIndex < uniqueSorted.length; rankIndex++) {
    valueRank.set(uniqueSorted[rankIndex], rankIndex + 1);
  }

  const fenwickSize = uniqueSorted.length;
  const countFenwick = new Array(fenwickSize + 1).fill(0);
  const sumFenwick = new Array(fenwickSize + 1).fill(0);

  let highestBit = 1;
  while (highestBit <= fenwickSize) highestBit <<= 1;
  highestBit >>= 1;

  const fenwickUpdate = (tree, index, delta) => {
    while (index <= fenwickSize) {
      tree[index] += delta;
      index += index & -index;
    }
  };

  const addNumber = (value) => {
    const rankIndex = valueRank.get(value);
    fenwickUpdate(countFenwick, rankIndex, 1);
    fenwickUpdate(sumFenwick, rankIndex, value);
  };

  const removeNumber = (value) => {
    const rankIndex = valueRank.get(value);
    fenwickUpdate(countFenwick, rankIndex, -1);
    fenwickUpdate(sumFenwick, rankIndex, -value);
  };

  const sumOfSmallest = (neededCount) => {
    if (neededCount <= 0) return 0;
    let remaining = neededCount;
    let resultSum = 0;
    let index = 0;
    for (let bit = highestBit; bit > 0; bit >>= 1) {
      const nextIndex = index + bit;
      if (nextIndex <= fenwickSize && countFenwick[nextIndex] < remaining) {
        remaining -= countFenwick[nextIndex];
        resultSum += sumFenwick[nextIndex];
        index = nextIndex;
      }
    }
    const nextRank = index + 1;
    if (remaining > 0 && nextRank <= fenwickSize) {
      resultSum += remaining * uniqueSorted[nextRank - 1];
    }
    return resultSum;
  };

  for (let idx = 1; idx <= dist + 1 && idx < arrayLength; idx++) {
    addNumber(nums[idx]);
  }
  let minWindowSum = sumOfSmallest(selectedCount);

  for (let idx = dist + 2; idx < arrayLength; idx++) {
    removeNumber(nums[idx - dist - 1]);
    addNumber(nums[idx]);
    minWindowSum = Math.min(minWindowSum, sumOfSmallest(selectedCount));
  }

  return nums[0] + minWindowSum;
};
