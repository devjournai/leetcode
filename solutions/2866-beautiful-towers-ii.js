/**
 * Beautiful Towers II
 *
 * Intuition:
 * We choose every index as the mountain peak.
 *
 * If index i is the peak, then:
 *
 * • Moving left, heights cannot increase.
 * • Moving right, heights cannot increase.
 *
 * Therefore, the optimal height at each side is:
 *
 *      min(previous height, maxHeights[current])
 *
 * Instead of recomputing this for every peak (O(N²)),
 * we use two monotonic stacks.
 *
 * -----------------------------------------------------------------------
 *
 * Observation:
 *
 * Let:
 *
 *      leftSum[i]
 *
 * = maximum total height from [0...i]
 *   assuming i is the highest point on the right.
 *
 * Similarly,
 *
 *      rightSum[i]
 *
 * = maximum total height from [i...n-1]
 *   assuming i is the highest point on the left.
 *
 * We compute both arrays using a monotonic increasing stack.
 *
 * -----------------------------------------------------------------------
 *
 * Stack Idea
 *
 * While processing from left:
 *
 * Maintain indices whose heights are increasing.
 *
 * If current height is smaller,
 * pop taller elements because they must now be reduced.
 *
 * The contribution becomes
 *
 *      height × width
 *
 * plus the contribution before the previous smaller element.
 *
 * The same logic is repeated from the right.
 *
 * -----------------------------------------------------------------------
 *
 * Formula
 *
 * For every peak:
 *
 *      answer =
 *          leftSum[i]
 *        + rightSum[i]
 *        - maxHeights[i]
 *
 * (peak counted twice)
 *
 * Take the maximum.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run
 *
 * maxHeights =
 *
 * [5,3,4,1,1]
 *
 * leftSum:
 *
 * [5,6,10,4,5]
 *
 * rightSum:
 *
 * [13,8,6,2,1]
 *
 * Peak = 0
 *
 *      5 + 13 - 5 = 13
 *
 * Maximum = 13.
 *
 * -----------------------------------------------------------------------
 *
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
        : leftSum[i] + rightSum[i] - BigInt(maxHeights[i]),
    );
  }

  return Number(answer);
};
