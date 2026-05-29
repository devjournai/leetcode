/**
 * Minimum Number Of Lines To Cover Points
 * Intuition: This problem can be modeled as a set cover problem. Given the small constraint on the number of points (N <= 15), dynamic programming with bitmask can efficiently find the minimum number of lines required to cover all points.
 * Approach:
 * 1. Handle base cases for N <= 2 points, where only 1 line is needed to cover all points.
 * 2. Precompute all unique lines that can be formed by any two points, or by a single point. These lines are represented as bitmasks, where each set bit corresponds to a point lying on that line. For a line formed by points `i` and `j`, we find all other points `k` that are collinear with `i` and `j` and include them in the line's bitmask. Lines covering only a single point are also generated.
 * 3. Initialize a dynamic programming array `dynamicProgram` of size `2^N`. `dynamicProgram[mask]` will store the minimum number of lines to cover the set of points represented by `mask`. Set `dynamicProgram[0] = 0` (zero lines for zero points) and all other `dynamicProgram[mask]` values to infinity.
 * 4. Iterate `currentMaskState` from `1` to `(1 << N) - 1`. For each `currentMaskState`:
 *    a. Identify the `firstUncoveredPointIndex` (the lowest indexed point) that is set within `currentMaskState`. This ensures a canonical way to process each mask, by always picking the lowest-indexed uncovered point.
 *    b. Iterate through each `lineCandidateMask` precomputed in step 2:
 *       If `lineCandidateMask` covers `firstUncoveredPointIndex` (i.e., `(lineCandidateMask & (1 << firstUncoveredPointIndex)) !== 0`):
 *          Calculate `remainingPointsMask` by performing a bitwise AND operation between `currentMaskState` and the bitwise NOT of `lineCandidateMask`. This `remainingPointsMask` represents the points that are still uncovered after using `lineCandidateMask`.
 *          Update `dynamicProgram[currentMaskState]` with the minimum of its current value and `1 + dynamicProgram[remainingPointsMask]`.
 * 5. The final answer is `dynamicProgram[(1 << N) - 1]`, which represents the minimum lines to cover all points from `0` to `N-1`.
 * Dry Run:
 * points = [[0,0], [1,1], [2,2]] (N=3)
 * Base case: N=3, condition `pointCount <= 2` is false, proceed.
 * dynamicProgram = [0, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity, Infinity] (size 2^3=8)
 *
 * Precompute allLineMasksSet:
 * Iterate `firstIndex` (0 to 2):
 *   `allLineMasksSet.add(1 << 0)` -> {1}
 *   `allLineMasksSet.add(1 << 1)` -> {1, 2}
 *   `allLineMasksSet.add(1 << 2)` -> {1, 2, 4}
 *
 *   Iterate `secondIndex` (from `firstIndex + 1` to 2):
 *     `firstIndex = 0, secondIndex = 1`:
 *       `pointOne=(0,0)`, `pointTwo=(1,1)`. `currentPointsMask = (1<<0) | (1<<1) = 3`.
 *       `thirdIndex = 2`: `pointThree=(2,2)`. `(1-0)*(2-1) === (2-1)*(1-0)` -> `1*1 === 1*1` -> `1 === 1`. Collinear.
 *       `currentPointsMask |= (1<<2)`. `currentPointsMask = 7`.
 *       `allLineMasksSet.add(7)`. -> {1, 2, 4, 7}
 *     `firstIndex = 0, secondIndex = 2`:
 *       `pointOne=(0,0)`, `pointTwo=(2,2)`. `currentPointsMask = (1<<0) | (1<<2) = 5`.
 *       `thirdIndex = 1`: `pointThree=(1,1)`. `(2-0)*(1-2) === (1-2)*(2-0)` -> `2*(-1) === (-1)*2` -> `-2 === -2`. Collinear.
 *       `currentPointsMask |= (1<<1)`. `currentPointsMask = 7`.
 *       `allLineMasksSet.add(7)`. (already present)
 *     `firstIndex = 1, secondIndex = 2`:
 *       `pointOne=(1,1)`, `pointTwo=(2,2)`. `currentPointsMask = (1<<1) | (1<<2) = 6`.
 *       `thirdIndex = 0`: `pointThree=(0,0)`. `(2-1)*(0-2) === (0-2)*(2-1)` -> `1*(-2) === (-2)*1` -> `-2 === -2`. Collinear.
 *       `currentPointsMask |= (1<<0)`. `currentPointsMask = 7`.
 *       `allLineMasksSet.add(7)`. (already present)
 *
 * Final `allLineMasksSet = {1, 2, 4, 7}`
 *
 * DP iteration (`currentMaskState` from 1 to 7):
 * `currentMaskState = 1` (points[0]):
 *   `firstUncoveredPointIndex = 0`.
 *   `lineCandidateMask = 1`: `(1 & (1<<0)) !== 0`. `remainingPointsMask = 1 & (~1) = 0`. `dynamicProgram[1] = min(Infinity, 1 + dynamicProgram[0]) = 1`.
 * `currentMaskState = 2` (points[1]):
 *   `firstUncoveredPointIndex = 1`.
 *   `lineCandidateMask = 2`: `(2 & (1<<1)) !== 0`. `remainingPointsMask = 2 & (~2) = 0`. `dynamicProgram[2] = min(Infinity, 1 + dynamicProgram[0]) = 1`.
 * `currentMaskState = 3` (points[0], points[1]):
 *   `firstUncoveredPointIndex = 0`.
 *   `lineCandidateMask = 1`: `remainingPointsMask = 3 & (~1) = 2`. `dynamicProgram[3] = min(Infinity, 1 + dynamicProgram[2]) = 1 + 1 = 2`.
 *   `lineCandidateMask = 7`: `remainingPointsMask = 3 & (~7) = 0`. `dynamicProgram[3] = min(2, 1 + dynamicProgram[0]) = 1`.
 * `currentMaskState = 4` (points[2]):
 *   `firstUncoveredPointIndex = 2`.
 *   `lineCandidateMask = 4`: `remainingPointsMask = 4 & (~4) = 0`. `dynamicProgram[4] = min(Infinity, 1 + dynamicProgram[0]) = 1`.
 * `currentMaskState = 5` (points[0], points[2]):
 *   `firstUncoveredPointIndex = 0`.
 *   `lineCandidateMask = 1`: `remainingPointsMask = 5 & (~1) = 4`. `dynamicProgram[5] = min(Infinity, 1 + dynamicProgram[4]) = 1 + 1 = 2`.
 *   `lineCandidateMask = 7`: `remainingPointsMask = 5 & (~7) = 0`. `dynamicProgram[5] = min(2, 1 + dynamicProgram[0]) = 1`.
 * `currentMaskState = 6` (points[1], points[2]):
 *   `firstUncoveredPointIndex = 1`.
 *   `lineCandidateMask = 2`: `remainingPointsMask = 6 & (~2) = 4`. `dynamicProgram[6] = min(Infinity, 1 + dynamicProgram[4]) = 1 + 1 = 2`.
 *   `lineCandidateMask = 7`: `remainingPointsMask = 6 & (~7) = 0`. `dynamicProgram[6] = min(2, 1 + dynamicProgram[0]) = 1`.
 * `currentMaskState = 7` (points[0], points[1], points[2]):
 *   `firstUncoveredPointIndex = 0`.
 *   `lineCandidateMask = 1`: `remainingPointsMask = 7 & (~1) = 6`. `dynamicProgram[7] = min(Infinity, 1 + dynamicProgram[6]) = 1 + 1 = 2`.
 *   `lineCandidateMask = 7`: `remainingPointsMask = 7 & (~7) = 0`. `dynamicProgram[7] = min(2, 1 + dynamicProgram[0]) = 1`.
 *
 * Final Result: `dynamicProgram[7] = 1`. Correct, all three collinear points are covered by 1 line.
 * Time Complexity: O(N^3 + 2^N * N^2)
 * Space Complexity: O(2^N + N^2)
 */
var minimumLines = function (points) {
  const pointCount = points.length;

  if (pointCount <= 2) {
    return 1;
  }

  const dynamicProgram = new Array(1 << pointCount).fill(Infinity);
  dynamicProgram[0] = 0;

  const allLineMasksSet = new Set();

  for (let firstIndex = 0; firstIndex < pointCount; firstIndex++) {
    allLineMasksSet.add(1 << firstIndex);

    for (
      let secondIndex = firstIndex + 1;
      secondIndex < pointCount;
      secondIndex++
    ) {
      let currentPointsMask = (1 << firstIndex) | (1 << secondIndex);

      const pointOneX = points[firstIndex][0];
      const pointOneY = points[firstIndex][1];
      const pointTwoX = points[secondIndex][0];
      const pointTwoY = points[secondIndex][1];

      for (let thirdIndex = 0; thirdIndex < pointCount; thirdIndex++) {
        if (thirdIndex === firstIndex || thirdIndex === secondIndex) {
          continue;
        }

        const pointThreeX = points[thirdIndex][0];
        const pointThreeY = points[thirdIndex][1];

        const deltaYOne = pointTwoY - pointOneY;
        const deltaXOne = pointTwoX - pointOneX;
        const deltaYTwo = pointThreeY - pointTwoY;
        const deltaXTwo = pointThreeX - pointTwoX;

        if (deltaYOne * deltaXTwo === deltaYTwo * deltaXOne) {
          currentPointsMask |= 1 << thirdIndex;
        }
      }
      allLineMasksSet.add(currentPointsMask);
    }
  }

  for (
    let currentMaskState = 1;
    currentMaskState < 1 << pointCount;
    currentMaskState++
  ) {
    let firstUncoveredPointIndex = 0;
    let maskSearchValue = currentMaskState;
    while (((maskSearchValue >> firstUncoveredPointIndex) & 1) === 0) {
      firstUncoveredPointIndex++;
    }

    for (const lineCandidateMask of allLineMasksSet) {
      if ((lineCandidateMask & (1 << firstUncoveredPointIndex)) !== 0) {
        const remainingPointsMask = currentMaskState & ~lineCandidateMask;
        dynamicProgram[currentMaskState] = Math.min(
          dynamicProgram[currentMaskState],
          1 + dynamicProgram[remainingPointsMask],
        );
      }
    }
  }

  return dynamicProgram[(1 << pointCount) - 1];
};
