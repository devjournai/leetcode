/**
 * Find Maximal Uncovered Ranges
 * Intuition: The problem asks for maximal uncovered ranges. This implies we first need to identify all covered ranges. By consolidating overlapping and adjacent covered ranges, we can determine the minimal set of "maximal covered ranges". The uncovered ranges are then simply the gaps between these maximal covered ranges and the boundaries of the total interval [0, n-1].
 * Approach: 1. If no ranges are provided, the entire interval [0, n-1] is uncovered. 2. Sort the given `ranges` by their starting points. This is essential for efficiently merging them. 3. Iterate through the sorted ranges, merging any that overlap or are adjacent. This process creates a list of "maximal covered ranges" which are disjoint and non-adjacent. 4. With the list of maximal covered ranges, identify the "uncovered ranges" by looking for gaps: a) between `0` and the start of the first maximal covered range, b) between the end of one maximal covered range and the start of the next, and c) between the end of the last maximal covered range and `n-1`. 5. Collect these identified gaps as the result.
 * Dry Run: n = 10, ranges = [[0, 2], [5, 7], [1, 3]]
 * 1. Initial check: `ranges.length` is 3, not 0.
 * 2. Sort `ranges`: `sortedRangesData = [[0, 2], [1, 3], [5, 7]]`.
 * 3. Merge `sortedRangesData`:
 *    - Initialize `mergedIntervals = []`.
 *    - `currentMergeStart = 0`, `currentMergeEnd = 2`.
 *    - `iterationIndex = 1`: `rangeBegin = 1`, `rangeEnd = 3`. Since `1 <= 2 + 1`, merge: `currentMergeEnd = Math.max(2, 3) = 3`.
 *    - `iterationIndex = 2`: `rangeBegin = 5`, `rangeEnd = 7`. Since `5 > 3 + 1`, push `[0, 3]` to `mergedIntervals`. Reset `currentMergeStart = 5`, `currentMergeEnd = 7`.
 *    - After loop, push `[5, 7]` to `mergedIntervals`.
 *    - `mergedIntervals = [[0, 3], [5, 7]]`.
 * 4. Find Gaps:
 *    - Initialize `resultantUncoveredRanges = []`.
 *    - Gap before first interval: `mergedIntervals[0][0]` is 0. No gap since `0 > 0` is false.
 *    - Internal gaps (loop with `gapSearchIndex`):
 *      - `gapSearchIndex = 0`: `intervalEndBoundary = 3`, `nextIntervalStartBoundary = 5`.
 *        `gapStartCoordinate = 3 + 1 = 4`, `gapEndCoordinate = 5 - 1 = 4`.
 *        Since `4 <= 4`, `resultantUncoveredRanges.push([4, 4])`.
 *        `resultantUncoveredRanges` is now `[[4, 4]]`.
 *    - Gap after last interval: `lastIntervalEnding = 7`. Since `7 < n - 1` (i.e., `7 < 9`), push `[7 + 1, 9]` which is `[8, 9]`.
 *    - `resultantUncoveredRanges` is now `[[4, 4], [8, 9]]`.
 * 5. Return `[[4, 4], [8, 9]]`.
 * Time Complexity: O(R log R + R)
 * Space Complexity: O(R)
 */
var findMaximalUncoveredRanges = function (n, ranges) {
  if (ranges.length === 0) {
    return [[0, n - 1]];
  }

  const sortedRangesData = [...ranges];
  sortedRangesData.sort(
    (firstInterval, secondInterval) => firstInterval[0] - secondInterval[0],
  );

  const mergedIntervals = [];
  let currentMergeStart = sortedRangesData[0][0];
  let currentMergeEnd = sortedRangesData[0][1];

  for (
    let iterationIndex = 1;
    iterationIndex < sortedRangesData.length;
    iterationIndex++
  ) {
    const [rangeBegin, rangeEnd] = sortedRangesData[iterationIndex];
    if (rangeBegin <= currentMergeEnd + 1) {
      currentMergeEnd = Math.max(currentMergeEnd, rangeEnd);
    } else {
      mergedIntervals.push([currentMergeStart, currentMergeEnd]);
      currentMergeStart = rangeBegin;
      currentMergeEnd = rangeEnd;
    }
  }
  mergedIntervals.push([currentMergeStart, currentMergeEnd]);

  const resultantUncoveredRanges = [];

  if (mergedIntervals[0][0] > 0) {
    resultantUncoveredRanges.push([0, mergedIntervals[0][0] - 1]);
  }

  for (
    let gapSearchIndex = 0;
    gapSearchIndex < mergedIntervals.length - 1;
    gapSearchIndex++
  ) {
    const intervalEndBoundary = mergedIntervals[gapSearchIndex][1];
    const nextIntervalStartBoundary = mergedIntervals[gapSearchIndex + 1][0];
    const gapStartCoordinate = intervalEndBoundary + 1;
    const gapEndCoordinate = nextIntervalStartBoundary - 1;
    if (gapStartCoordinate <= gapEndCoordinate) {
      resultantUncoveredRanges.push([gapStartCoordinate, gapEndCoordinate]);
    }
  }

  const lastIntervalEnding = mergedIntervals[mergedIntervals.length - 1][1];
  if (lastIntervalEnding < n - 1) {
    resultantUncoveredRanges.push([lastIntervalEnding + 1, n - 1]);
  }

  return resultantUncoveredRanges;
};
