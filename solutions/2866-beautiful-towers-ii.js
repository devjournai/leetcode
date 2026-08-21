/**
 * Beautiful Towers II
 * Intuition: Try every index as the mountain peak. Heights must be non-increasing away from the peak, so each side is min of maxHeights along a monotonic stack range.
 * Approach: 1. leftSum[i] via increasing stack: if no smaller left, height*(i+1), else leftSum[prev] + height*(i-prev). 2. Same from the right into rightSum. 3. Max of leftSum[i]+rightSum[i]-maxHeights[i] (peak counted twice).
 * Dry Run: maxHeights = [5,3,4,1,1]. leftSum = [5,6,10,4,5], rightSum = [13,8,6,2,1]. Peak 0: 5+13-5=13, which is the maximum.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

var maximumSumOfHeights = function (maxHeights) {
  const n = maxHeights.length;

  const leftSum = new Array(n).fill(0n);
  const rightSum = new Array(n).fill(0n);

  let stack = [];

  for (let i = 0; i < n; i++) {
    while (
      stack.length &&
      maxHeights[stack[stack.length - 1]] > maxHeights[i]
    ) {
      stack.pop();
    }

    if (stack.length === 0) {
      leftSum[i] = BigInt(maxHeights[i]) * BigInt(i + 1);
    } else {
      const prev = stack[stack.length - 1];
      leftSum[i] = leftSum[prev] + BigInt(maxHeights[i]) * BigInt(i - prev);
    }

    stack.push(i);
  }

  stack = [];

  for (let i = n - 1; i >= 0; i--) {
    while (
      stack.length &&
      maxHeights[stack[stack.length - 1]] > maxHeights[i]
    ) {
      stack.pop();
    }

    if (stack.length === 0) {
      rightSum[i] = BigInt(maxHeights[i]) * BigInt(n - i);
    } else {
      const next = stack[stack.length - 1];
      rightSum[i] = rightSum[next] + BigInt(maxHeights[i]) * BigInt(next - i);
    }

    stack.push(i);
  }

  let answer = 0n;

  for (let i = 0; i < n; i++) {
    answer = BigInt.asUintN(
      64,
      answer > leftSum[i] + rightSum[i] - BigInt(maxHeights[i])
        ? answer
        : leftSum[i] + rightSum[i] - BigInt(maxHeights[i])
    );
  }

  return Number(answer);
};
