/**
 * Minimum Total Space Wasted With K Resizing Operations
 * Intuition: The key insight is that for any segment of the array nums[start...end] where the array size remains fixed, the optimal fixed size to minimize wasted space is the maximum value in that segment. The wasted space for such a segment is (max_value * segment_length) - sum_of_values. This problem has optimal substructure and overlapping subproblems, suggesting dynamic programming.
 * Approach:
 * 1. Precompute the minimum wasted space for all possible contiguous subarrays (segments). Let `precomputedWaste[start][end]` store the wasted space for `nums[start...end]`. This is done by iterating `start` from `0` to `N-1`, and for each `start`, iterating `end` from `start` to `N-1`, keeping track of the maximum element and sum of elements in the current segment. This step takes O(N^2) time.
 * 2. Define a DP state `memoTable[i][segments]` representing the minimum total wasted space for the first `i` elements (`nums[0...i-1]`) using exactly `segments` fixed-size blocks.
 * 3. Initialize `memoTable[0][0] = 0` (no elements, no segments, no waste). All other `memoTable` entries are initialized to `Infinity`.
 * 4. Iterate `i` from `1` to `N` (representing the length of the prefix `nums[0...i-1]`).
 * 5. Inside, iterate `segments` from `1` to `k+1` (since `k` resizes allow for `k+1` segments).
 * 6. For each `(i, segments)` pair, iterate `splitPointIndex` from `0` to `i-1`. `splitPointIndex` represents where the *previous* segment ended (`nums[0...splitPointIndex-1]`) and the *current* segment starts (`nums[splitPointIndex...i-1]`).
 * 7. If `memoTable[splitPointIndex][segments - 1]` is not `Infinity` (meaning a valid path to `splitPointIndex` with `segments - 1` blocks exists), update `memoTable[i][segments]` with `min(memoTable[i][segments], memoTable[splitPointIndex][segments - 1] + precomputedWaste[splitPointIndex][i-1])`.
 * 8. The final result is the minimum value in `memoTable[N][j]` for `j` from `1` to `k+1`.
 * Dry Run:
 * nums = [10, 20, 15], k = 1
 * N = 3. Max segments = k+1 = 2.
 * memoTable size: 4x3. memoTable[0][0] = 0, others Infinity.
 * precomputedWaste (3x3):
 *   precomputedWaste[0][0] (segment [10]): 0
 *   precomputedWaste[0][1] (segment [10, 20]): (20*2)-30 = 10
 *   precomputedWaste[0][2] (segment [10, 20, 15]): (20*3)-45 = 15
 *   precomputedWaste[1][1] (segment [20]): 0
 *   precomputedWaste[1][2] (segment [20, 15]): (20*2)-35 = 5
 *   precomputedWaste[2][2] (segment [15]): 0
 *
 * DP Calculation:
 * i = 1 (prefix [10]):
 *   segments = 1:
 *     splitPointIndex = 0: memoTable[0][0]=0. currentWaste=precomputedWaste[0][0]=0.
 *       memoTable[1][1] = min(Infinity, 0+0) = 0.
 *   segments = 2: (no valid path from memoTable[0][1] or memoTable[1][1] with 2 segments)
 *     memoTable[1][2] remains Infinity.
 *
 * i = 2 (prefix [10, 20]):
 *   segments = 1:
 *     splitPointIndex = 0: memoTable[0][0]=0. currentWaste=precomputedWaste[0][1]=10.
 *       memoTable[2][1] = min(Infinity, 0+10) = 10.
 *   segments = 2:
 *     splitPointIndex = 0: memoTable[0][1]=Infinity. Skip.
 *     splitPointIndex = 1: memoTable[1][1]=0. currentWaste=precomputedWaste[1][1]=0.
 *       memoTable[2][2] = min(Infinity, 0+0) = 0.
 *
 * i = 3 (prefix [10, 20, 15]):
 *   segments = 1:
 *     splitPointIndex = 0: memoTable[0][0]=0. currentWaste=precomputedWaste[0][2]=15.
 *       memoTable[3][1] = min(Infinity, 0+15) = 15.
 *   segments = 2:
 *     splitPointIndex = 0: memoTable[0][1]=Infinity. Skip.
 *     splitPointIndex = 1: memoTable[1][1]=0. currentWaste=precomputedWaste[1][2]=5.
 *       memoTable[3][2] = min(Infinity, 0+5) = 5.
 *     splitPointIndex = 2: memoTable[2][1]=10. currentWaste=precomputedWaste[2][2]=0.
 *       memoTable[3][2] = min(5, 10+0) = 5.
 *
 * Final Result: min(memoTable[3][1], memoTable[3][2]) = min(15, 5) = 5.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var minSpaceWastedKResizing = function (nums, k) {
  const arrayLength = nums.length;

  const precomputedWaste = Array(arrayLength)
    .fill(0)
    .map(() => Array(arrayLength).fill(0));

  for (
    let segmentStartIndex = 0;
    segmentStartIndex < arrayLength;
    segmentStartIndex++
  ) {
    let segmentMax = 0;
    let segmentSum = 0;
    for (
      let segmentEndIndex = segmentStartIndex;
      segmentEndIndex < arrayLength;
      segmentEndIndex++
    ) {
      segmentMax = Math.max(segmentMax, nums[segmentEndIndex]);
      segmentSum += nums[segmentEndIndex];
      precomputedWaste[segmentStartIndex][segmentEndIndex] =
        segmentMax * (segmentEndIndex - segmentStartIndex + 1) - segmentSum;
    }
  }

  const memoTable = Array(arrayLength + 1)
    .fill(0)
    .map(() => Array(k + 2).fill(Infinity));
  memoTable[0][0] = 0;

  for (
    let currentPrefixLength = 1;
    currentPrefixLength <= arrayLength;
    currentPrefixLength++
  ) {
    for (
      let currentSegmentCount = 1;
      currentSegmentCount <= k + 1;
      currentSegmentCount++
    ) {
      for (
        let splitPointIndex = 0;
        splitPointIndex < currentPrefixLength;
        splitPointIndex++
      ) {
        if (memoTable[splitPointIndex][currentSegmentCount - 1] !== Infinity) {
          const currentSegmentWastedValue =
            precomputedWaste[splitPointIndex][currentPrefixLength - 1];
          memoTable[currentPrefixLength][currentSegmentCount] = Math.min(
            memoTable[currentPrefixLength][currentSegmentCount],
            memoTable[splitPointIndex][currentSegmentCount - 1] +
              currentSegmentWastedValue,
          );
        }
      }
    }
  }

  let minimumTotalWaste = Infinity;
  for (
    let finalSegmentCount = 1;
    finalSegmentCount <= k + 1;
    finalSegmentCount++
  ) {
    minimumTotalWaste = Math.min(
      minimumTotalWaste,
      memoTable[arrayLength][finalSegmentCount],
    );
  }

  return minimumTotalWaste;
};
