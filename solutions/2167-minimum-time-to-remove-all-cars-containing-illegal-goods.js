/**
 * Minimum Time To Remove All Cars Containing Illegal Goods
 * Intuition: The problem can be optimally solved by considering a "split point" across the train cars. For each possible split point, we calculate the minimum cost to clear illegal goods to its left (inclusive) and to its right (exclusive) using specific strategies. Cars to the left are cleared by either full left-end removals or individual 2-cost removals. Cars to the right are cleared by full right-end removals. The minimum total cost over all split points is the answer.
 * Approach: 1. Initialize `currentLeftRemovalCost` to 0, representing the accumulated minimum cost to clear a prefix `s[0...i]` of illegal goods.
 * 2. Initialize `overallMinimumTime` to `s.length`, covering the baseline cost of removing all cars from one end.
 * 3. Iterate with `iterationIndex` from 0 to `s.length - 1`:
 *    a. Calculate `costFromLeftStrategyOne`: `currentLeftRemovalCost + (s[iterationIndex] === '1' ? 2 : 0)`. This considers adding 2 units of time if the current car `s[iterationIndex]` contains goods (using an internal removal), or 0 if it doesn't.
 *    b. Calculate `costFromLeftStrategyTwo`: `iterationIndex + 1`. This represents the cost of simply removing all cars from `s[0]` up to `s[iterationIndex]` by repeatedly performing left-end removals.
 *    c. Update `currentLeftRemovalCost` to the minimum of `costFromLeftStrategyOne` and `costFromLeftStrategyTwo`. This ensures `currentLeftRemovalCost` always holds the minimum time to clear the prefix `s[0...iterationIndex]` using left-side operations.
 *    d. Calculate `costFromRightSegment`: `s.length - 1 - iterationIndex`. This is the cost to remove all cars from `s[iterationIndex + 1]` to `s[s.length - 1]` by repeatedly performing right-end removals.
 *    e. Update `overallMinimumTime` with `Math.min(overallMinimumTime, currentLeftRemovalCost + costFromRightSegment)`. This step combines the minimum cost for the left segment with the cost for the right segment for the current split point.
 * 4. After the loop, return `overallMinimumTime`.
 * Dry Run: s = "101"
 * stringLength = 3
 * currentLeftRemovalCost = 0
 * overallMinimumTime = 3
 *
 * iterationIndex = 0 (s[0] = '1'):
 *   costFromLeftStrategyOne = 0 + (s[0] === '1' ? 2 : 0) = 0 + 2 = 2
 *   costFromLeftStrategyTwo = 0 + 1 = 1
 *   currentLeftRemovalCost = Math.min(2, 1) = 1
 *   costFromRightSegment = 3 - 1 - 0 = 2
 *   overallMinimumTime = Math.min(3, 1 + 2) = 3
 *
 * iterationIndex = 1 (s[1] = '0'):
 *   costFromLeftStrategyOne = 1 + (s[1] === '1' ? 2 : 0) = 1 + 0 = 1
 *   costFromLeftStrategyTwo = 1 + 1 = 2
 *   currentLeftRemovalCost = Math.min(1, 2) = 1
 *   costFromRightSegment = 3 - 1 - 1 = 1
 *   overallMinimumTime = Math.min(3, 1 + 1) = 2
 *
 * iterationIndex = 2 (s[2] = '1'):
 *   costFromLeftStrategyOne = 1 + (s[2] === '1' ? 2 : 0) = 1 + 2 = 3
 *   costFromLeftStrategyTwo = 2 + 1 = 3
 *   currentLeftRemovalCost = Math.min(3, 3) = 3
 *   costFromRightSegment = 3 - 1 - 2 = 0
 *   overallMinimumTime = Math.min(2, 3 + 0) = 2
 *
 * Return 2.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minimumTime = function (s) {
  const stringLength = s.length;
  let currentLeftRemovalCost = 0;
  let overallMinimumTime = stringLength;

  for (
    let iterationIndex = 0;
    iterationIndex < stringLength;
    iterationIndex++
  ) {
    const costFromLeftStrategyOne =
      currentLeftRemovalCost + (s[iterationIndex] === "1" ? 2 : 0);
    const costFromLeftStrategyTwo = iterationIndex + 1;
    currentLeftRemovalCost = Math.min(
      costFromLeftStrategyOne,
      costFromLeftStrategyTwo
    );

    const costFromRightSegment = stringLength - 1 - iterationIndex;
    overallMinimumTime = Math.min(
      overallMinimumTime,
      currentLeftRemovalCost + costFromRightSegment
    );
  }

  return overallMinimumTime;
};
