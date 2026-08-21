/**
 * Minimum Time to Activate String
 * Intuition: All n(n+1)/2 substrings become valid once every gap is split by '*'. Adding stars from last to first, subtract the (left+1)*(right+1) new invalid block restored when a star is removed; the last t where remaining valid substrings still ≥ k is the answer.
 * Approach: 1. If total substrings < k return -1. 2. Doubly link indices as if every position is '*'. 3. Remove stars in reverse order of `order`, subtracting the segment product. 4. When the remaining valid count drops below k, return that time.
 * Dry Run: s="abc", order=[1,0,2], k=2. After t=0 (middle '*') already 4 ≥ 2 valid substrings, answer 0.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var minTime = function (s, order, k) {
  const length = s.length;
  const left = Array.from({ length }, (_, index) => index - 1);
  const right = Array.from({ length }, (_, index) => index + 1);
  let valid = ((length + 1) * length) / 2;

  if (valid < k) {
    return -1;
  }

  for (let time = length - 1; time >= 0; time--) {
    const index = order[time];
    const leftIndex = left[index];
    const rightIndex = right[index];
    valid -= (index - leftIndex) * (rightIndex - index);
    if (valid < k) {
      return time;
    }
    if (leftIndex >= 0) {
      right[leftIndex] = rightIndex;
    }
    if (rightIndex < length) {
      left[rightIndex] = leftIndex;
    }
  }

  return 0;
};
