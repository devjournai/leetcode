/**
 * Maximum Score of Non-overlapping Intervals
 * Intuition: Pick at most 4 non-overlapping intervals maximizing total weight, then the lexicographically smallest original-index list. Sort by start and DP: skip or pick and jump to the first start > current right.
 * Approach: 1. Attach original indices and sort by left. 2. dp(i, quota) memoizes best (weight, indices). 3. Binary search the next non-overlapping interval. 4. On ties, keep the lexicographically smaller index tuple.
 * Dry Run: intervals = [[1,3,2],[4,5,2],[1,5,5]], quota 4. Best is [2] weight 5 vs [0,1] weight 4.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */

var maximumWeight = function (intervals) {
  const indexedIntervals = intervals
    .map((interval, originalIndex) => [
      interval[0],
      interval[1],
      interval[2],
      originalIndex,
    ])
    .sort((leftInterval, rightInterval) => leftInterval[0] - rightInterval[0]);

  const intervalCount = indexedIntervals.length;
  const memo = Array.from({ length: intervalCount }, () =>
    new Array(5).fill(null)
  );

  const compareIndexLists = (firstList, secondList) => {
    const minLength = Math.min(firstList.length, secondList.length);
    for (let index = 0; index < minLength; index++) {
      if (firstList[index] !== secondList[index]) {
        return firstList[index] - secondList[index];
      }
    }
    return firstList.length - secondList.length;
  };

  const findFirstGreater = (startFrom, rightBoundary) => {
    let low = startFrom;
    let high = intervalCount;
    while (low < high) {
      const mid = (low + high) >> 1;
      if (indexedIntervals[mid][0] > rightBoundary) {
        high = mid;
      } else {
        low = mid + 1;
      }
    }
    return low;
  };

  const dp = (intervalIndex, remainingQuota) => {
    if (intervalIndex === intervalCount || remainingQuota === 0) {
      return { weight: 0, selected: [] };
    }
    if (memo[intervalIndex][remainingQuota] !== null) {
      return memo[intervalIndex][remainingQuota];
    }

    const skipChoice = dp(intervalIndex + 1, remainingQuota);
    const [, rightEndpoint, intervalWeight, originalIndex] =
      indexedIntervals[intervalIndex];
    const nextIndex = findFirstGreater(intervalIndex + 1, rightEndpoint);
    const afterPick = dp(nextIndex, remainingQuota - 1);
    const pickedIndices = [...afterPick.selected, originalIndex].sort(
      (left, right) => left - right
    );
    const pickChoice = {
      weight: intervalWeight + afterPick.weight,
      selected: pickedIndices,
    };

    const betterChoice =
      pickChoice.weight > skipChoice.weight ||
      (pickChoice.weight === skipChoice.weight &&
        compareIndexLists(pickChoice.selected, skipChoice.selected) < 0)
        ? pickChoice
        : skipChoice;

    memo[intervalIndex][remainingQuota] = betterChoice;
    return betterChoice;
  };

  return dp(0, 4).selected;
};
