/**
 * Minimum Stability Factor of Array
 * Intuition: After at most maxC changes, the remaining stability is the longest gcd>=2 subarray. Binary-search that length: a candidate L cannot be fully destroyed if more than maxC disjoint L-windows still have gcd>=2.
 * Approach: 1. Sparse table of gcd for O(1) range queries. 2. check(L) greedily counts disjoint windows of length L with gcd>=2 and tests count > maxC. 3. Binary-search the largest L that still fails, which is the min achievable stability (0 if length 1 can be cleared).
 * Dry Run: nums = [3,5,10], maxC = 1. Length-2 window [5,10] gcd 5 needs one change; check(2) true, check(3) false → answer 1 after changing 5.
 * Time Complexity: O(n log n * log A)
 * Space Complexity: O(n log n)
 */
var minStable = function (nums, maxC) {
  const gcd = (left, right) => {
    while (right) {
      const remainder = left % right;
      left = right;
      right = remainder;
    }
    return left;
  };

  const length = nums.length;
  const maxLevel = 32 - Math.clz32(length);
  const table = Array.from({ length: maxLevel }, () => Array(length).fill(0));
  table[0] = nums.slice();

  for (let level = 1; level < maxLevel; level++) {
    const span = 1 << level;
    const half = 1 << (level - 1);
    for (let index = 0; index + span - 1 < length; index++) {
      table[level][index] = gcd(
        table[level - 1][index],
        table[level - 1][index + half]
      );
    }
  }

  const rangeGcd = (left, right) => {
    const bits = 31 - Math.clz32(right - left + 1);
    return gcd(table[bits][left], table[bits][right - (1 << bits) + 1]);
  };

  const cannotDestroy = (windowLength) => {
    let changesNeeded = 0;
    let index = 0;
    while (index + windowLength - 1 < length) {
      if (rangeGcd(index, index + windowLength - 1) >= 2) {
        changesNeeded++;
        index += windowLength;
      } else {
        index++;
      }
    }
    return changesNeeded > maxC;
  };

  let low = 1;
  let high = length;
  let answer = 0;
  while (low <= high) {
    const mid = (low + high) >> 1;
    if (cannotDestroy(mid)) {
      answer = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return answer;
};
