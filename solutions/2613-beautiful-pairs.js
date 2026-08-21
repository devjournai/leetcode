/**
 * Beautiful Pairs
 * Intuition: The Manhattan distance |x1-x2| + |y1-y2| can be transformed. If we fix `i` and consider `j` such that `nums1[i] >= nums1[j]`, the distance becomes `(nums1[i] - nums1[j]) + |nums2[i] - nums2[j]|`. This further splits into two cases based on `nums2[i]` and `nums2[j]`:
 * Case 1: `nums2[i] >= nums2[j]`. Distance is `(nums1[i] - nums1[j]) + (nums2[i] - nums2[j]) = (nums1[i] + nums2[i]) - (nums1[j] + nums2[j])`. To minimize, we need to maximize `(nums1[j] + nums2[j])` among `j` where `nums2[j] <= nums2[i]`.
 * Case 2: `nums2[i] < nums2[j]`. Distance is `(nums1[i] - nums1[j]) + (nums2[j] - nums2[i]) = (nums1[i] - nums2[i]) - (nums1[j] - nums2[j])`. To minimize, we need to maximize `(nums1[j] - nums2[j])` among `j` where `nums2[j] > nums2[i]`.
 * This problem can be solved efficiently by sorting points by `nums1` and using two segment trees to query for optimal `j` in the two cases. Each segment tree will operate on the range of `nums2` values.
 *
 * Approach:
 * 1. Define `arrayLength` and determine `maxValue` from all elements in `nums1` and `nums2` to set the `treeArraySize` for segment trees.
 * 2. Create `sortedIndices`: an array of `0` to `arrayLength-1`, sorted primarily by `nums1[k]` and then by `k` for tie-breaking.
 * 3. Initialize `firstSegmentTree` and `secondSegmentTree` arrays of size `2 * treeArraySize`, filled with `-1` (indicating no valid index). These will store indices `k`.
 * 4. Implement `findBetterIndex(idxA, idxB, direction)`: a helper function that compares two indices `idxA` and `idxB` based on a transformed value `(-nums1[k] + direction * nums2[k])`. It returns the index `k` that yields the minimum transformed value, breaking ties with a smaller original index. This logic helps find the `j` that maximizes `(nums1[j] + nums2[j])` (for `direction = -1`) or `(nums1[j] - nums2[j])` (for `direction = 1`).
 * 5. Implement `updateSegmentTree(positionY, pointIdx, direction)`: updates the segment tree at the leaf corresponding to `positionY` with `pointIdx`, then propagates this update up to parent nodes if `pointIdx` represents a "better" value according to `findBetterIndex`.
 * 6. Implement `querySegmentTree(rangeStart, rangeEnd, direction)`: performs a range query on the segment tree to find the "best" index `k` within the `nums2` value range `[rangeStart, rangeEnd]`.
 * 7. Implement `determineBestPair(currentXIdx, candidateLeftIndex, candidateRightIndex, existingBestPair)`: calculates distances for potential new pairs formed by `currentXIdx` and `candidateLeftIndex` (Case 1) or `candidateRightIndex` (Case 2). It compares these with `existingBestPair` and returns the lexicographically smallest pair with the minimum distance.
 * 8. Add the first point (`sortedIndices[0]`) to both segment trees using `updateSegmentTree`.
 * 9. Iterate through `sortedIndices` from the second point (`currentIteration = 1` to `arrayLength - 1`):
 *    a. Get the `pointPrimaryIndex` and its `currentSecondNumber` (`nums2` value).
 *    b. Query `firstSegmentTree` for `candidateLeftIndex` (best `j` for `nums2[j] <= currentSecondNumber`, corresponds to Case 1 using `direction=-1`).
 *    c. Query `secondSegmentTree` for `candidateRightIndex` (best `j` for `nums2[j] > currentSecondNumber`, corresponds to Case 2 using `direction=1`).
 *    d. Update `minDistancePair` by calling `determineBestPair` with `currentXIdx`, the two candidates, and the current `minDistancePair`.
 *    e. Add the `pointPrimaryIndex` to both segment trees using `updateSegmentTree` for future iterations.
 * 10. Return `minDistancePair`.
 *
 * Dry Run:
 * nums1 = [1, 2, 3], nums2 = [4, 1, 2]
 * arrayLength = 3, maxValue = 4, treeArraySize = 5
 *
 * sortedIndices = [0, 1, 2] (based on nums1: (1,4), (2,1), (3,2))
 * firstSegmentTree = Array(10).fill(-1)
 * secondSegmentTree = Array(10).fill(-1)
 * minDistancePair = null
 *
 * // Initial point: sortedIndices[0] = 0 (data (1,4))
 * updateSegmentTree(4, 0, -1); // firstSegmentTree stores 0 at nodes covering Y=4 (and parents)
 * updateSegmentTree(4, 0, 1);  // secondSegmentTree stores 0 at nodes covering Y=4 (and parents)
 *
 * // Loop currentIteration = 1: pointPrimaryIndex = 1 (data (2,1))
 * currentSecondNumber = 1
 * candidateLeftIndex = querySegmentTree(0, 1, -1) // Query firstSegmentTree for Y <= 1
 *   - Only point 0 (Y=4) is in tree, not <= 1. Returns -1.
 * candidateLeftIndex = -1
 * candidateRightIndex = querySegmentTree(1, 4, 1) // Query secondSegmentTree for Y > 1
 *   - Point 0 (Y=4) satisfies Y > 1. Returns 0.
 * candidateRightIndex = 0
 *
 * minDistancePair = determineBestPair(1, -1, 0, null)
 *   - Current (x,y) = (2,1), Candidate (x',y') = (1,4)
 *   - Case 2: (nums1[1]-nums2[1]) - (nums1[0]-nums2[0]) = (2-1) - (1-4) = 1 - (-3) = 4
 *   - New candidate pair: [4, [0,1]]
 *   - minDistancePair becomes [0,1]
 *
 * updateSegmentTree(1, 1, -1); // firstSegmentTree stores 1 at nodes covering Y=1
 * updateSegmentTree(1, 1, 1);  // secondSegmentTree stores 1 at nodes covering Y=1
 *
 * // Loop currentIteration = 2: pointPrimaryIndex = 2 (data (3,2))
 * currentSecondNumber = 2
 * candidateLeftIndex = querySegmentTree(0, 2, -1) // Query firstSegmentTree for Y <= 2
 *   - Points in tree: 0 (Y=4), 1 (Y=1)
 *   - For Y <= 2, only point 1 (Y=1) qualifies. `findBetterIndex` picks 1 (max x+y is 3). Returns 1.
 * candidateLeftIndex = 1
 * candidateRightIndex = querySegmentTree(2, 4, 1) // Query secondSegmentTree for Y > 2
 *   - Points in tree: 0 (Y=4), 1 (Y=1)
 *   - For Y > 2, only point 0 (Y=4) qualifies. Returns 0.
 * candidateRightIndex = 0
 *
 * minDistancePair = determineBestPair(2, 1, 0, [0,1])
 *   - Current (x,y) = (3,2)
 *   - Candidate 1 (from Left): (x',y') = (2,1) (index 1)
 *     - Case 1: (nums1[2]+nums2[2]) - (nums1[1]+nums2[1]) = (3+2) - (2+1) = 5 - 3 = 2
 *     - New pair: [2, [1,2]]
 *   - Candidate 2 (from Right): (x',y') = (1,4) (index 0)
 *     - Case 2: (nums1[2]-nums2[2]) - (nums1[0]-nums2[0]) = (3-2) - (1-4) = 1 - (-3) = 4
 *     - New pair: [4, [0,2]]
 *   - Existing best: [0,1]
 *     - Distance: |nums1[0]-nums1[1]| + |nums2[0]-nums2[1]| = |1-2| + |4-1| = 1 + 3 = 4
 *   - Compare [2, [1,2]], [4, [0,2]], [4, [0,1]]
 *   - [2, [1,2]] is the best.
 *   - minDistancePair becomes [1,2]
 *
 * updateSegmentTree(2, 2, -1); // firstSegmentTree stores 2 at nodes covering Y=2
 * updateSegmentTree(2, 2, 1);  // secondSegmentTree stores 2 at nodes covering Y=2
 *
 * Return minDistancePair = [1,2].
 *
 * Time Complexity: O(N log N + N log M)
 * Space Complexity: O(N + M)
 */
var beautifulPair = function (nums1, nums2) {
  const n = nums1.length;
  const points = [];

  const map = new Map();

  for (let i = 0; i < n; i++) {
    const key = nums1[i] * 100000 + nums2[i];

    if (!map.has(key)) {
      map.set(key, []);
    }

    map.get(key).push(i);
  }

  for (let i = 0; i < n; i++) {
    const key = nums1[i] * 100000 + nums2[i];

    if (map.get(key).length > 1) {
      return [i, map.get(key)[1]];
    }

    points.push([nums1[i], nums2[i], i]);
  }

  points.sort((a, b) => a[0] - b[0]);

  const dist = (x1, y1, x2, y2) => {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  };

  const better = (a, b) => {
    if (a[0] !== b[0]) {
      return a[0] < b[0];
    }

    if (a[1] !== b[1]) {
      return a[1] < b[1];
    }

    return a[2] < b[2];
  };

  const dfs = (left, right) => {
    if (left >= right) {
      return [1 << 30, -1, -1];
    }

    const mid = (left + right) >> 1;
    const middleX = points[mid][0];

    let best = dfs(left, mid);
    const rightBest = dfs(mid + 1, right);

    if (better(rightBest, best)) {
      best = rightBest;
    }

    const candidates = [];

    for (let i = left; i <= right; i++) {
      if (Math.abs(points[i][0] - middleX) <= best[0]) {
        candidates.push(points[i]);
      }
    }

    candidates.sort((a, b) => a[1] - b[1]);

    for (let i = 0; i < candidates.length; i++) {
      for (let j = i + 1; j < candidates.length; j++) {
        if (candidates[j][1] - candidates[i][1] > best[0]) {
          break;
        }

        const p1 = Math.min(candidates[i][2], candidates[j][2]);
        const p2 = Math.max(candidates[i][2], candidates[j][2]);

        const d = dist(
          candidates[i][0],
          candidates[i][1],
          candidates[j][0],
          candidates[j][1]
        );

        const current = [d, p1, p2];

        if (better(current, best)) {
          best = current;
        }
      }
    }

    return best;
  };

  const result = dfs(0, points.length - 1);

  return [result[1], result[2]];
};
