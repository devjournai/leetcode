/**
 * Beautiful Towers I
 * Intuition: A mountain-shaped tower arrangement has a single peak (or a plateau) from which heights non-decrease to the left and non-increase to the right. To maximize the total sum of heights, we can iterate through each possible tower in the array, considering it as the peak. For a chosen peak, we then determine the maximum possible heights for all towers to its left and right, respecting the mountain shape rules and their original height constraints.
 * Approach: 1. Initialize `maxTotalHeight` to 0 to store the highest sum found. 2. Iterate through each `currentPeakIndex` from `0` to `n-1`, treating `heights[currentPeakIndex]` as the potential peak. 3. For each `currentPeakIndex`, calculate `sumForCurrentPeak` by first adding `heights[currentPeakIndex]`. 4. Traverse left from the peak: Initialize `lastValidHeightLeft` to `heights[currentPeakIndex]`. Iterate `leftPointer` from `currentPeakIndex - 1` down to `0`. For each `leftPointer`, the tower height `calculatedLeftHeight` is `Math.min(heights[leftPointer], lastValidHeightLeft)`. Add `calculatedLeftHeight` to `sumForCurrentPeak` and update `lastValidHeightLeft`. 5. Traverse right from the peak: Initialize `lastValidHeightRight` to `heights[currentPeakIndex]`. Iterate `rightPointer` from `currentPeakIndex + 1` up to `n-1`. For each `rightPointer`, the tower height `calculatedRightHeight` is `Math.min(heights[rightPointer], lastValidHeightRight)`. Add `calculatedRightHeight` to `sumForCurrentPeak` and update `lastValidHeightRight`. 6. Update `maxTotalHeight` with `Math.max(maxTotalHeight, sumForCurrentPeak)`. 7. After checking all possible peaks, return `maxTotalHeight`.
 * Dry Run: heights = [5, 3, 4, 1, 1]
 * totalTowers = 5, maxTotalHeight = 0
 *
 * currentPeakIndex = 0 (heights[0] = 5):
 *   sumForCurrentPeak = 5
 *   Left scan (no towers to the left)
 *   lastValidHeightRight = 5
 *   rightPointer = 1: calculatedRightHeight = min(heights[1]=3, 5) = 3. sumForCurrentPeak = 5+3=8. lastValidHeightRight = 3.
 *   rightPointer = 2: calculatedRightHeight = min(heights[2]=4, 3) = 3. sumForCurrentPeak = 8+3=11. lastValidHeightRight = 3.
 *   rightPointer = 3: calculatedRightHeight = min(heights[3]=1, 3) = 1. sumForCurrentPeak = 11+1=12. lastValidHeightRight = 1.
 *   rightPointer = 4: calculatedRightHeight = min(heights[4]=1, 1) = 1. sumForCurrentPeak = 12+1=13. lastValidHeightRight = 1.
 *   maxTotalHeight = max(0, 13) = 13
 *
 * currentPeakIndex = 1 (heights[1] = 3):
 *   sumForCurrentPeak = 3
 *   lastValidHeightLeft = 3
 *   leftPointer = 0: calculatedLeftHeight = min(heights[0]=5, 3) = 3. sumForCurrentPeak = 3+3=6. lastValidHeightLeft = 3.
 *   lastValidHeightRight = 3
 *   rightPointer = 2: calculatedRightHeight = min(heights[2]=4, 3) = 3. sumForCurrentPeak = 6+3=9. lastValidHeightRight = 3.
 *   rightPointer = 3: calculatedRightHeight = min(heights[3]=1, 3) = 1. sumForCurrentPeak = 9+1=10. lastValidHeightRight = 1.
 *   rightPointer = 4: calculatedRightHeight = min(heights[4]=1, 1) = 1. sumForCurrentPeak = 10+1=11. lastValidHeightRight = 1.
 *   maxTotalHeight = max(13, 11) = 13
 *
 * currentPeakIndex = 2 (heights[2] = 4):
 *   sumForCurrentPeak = 4
 *   lastValidHeightLeft = 4
 *   leftPointer = 1: calculatedLeftHeight = min(heights[1]=3, 4) = 3. sumForCurrentPeak = 4+3=7. lastValidHeightLeft = 3.
 *   leftPointer = 0: calculatedLeftHeight = min(heights[0]=5, 3) = 3. sumForCurrentPeak = 7+3=10. lastValidHeightLeft = 3.
 *   lastValidHeightRight = 4
 *   rightPointer = 3: calculatedRightHeight = min(heights[3]=1, 4) = 1. sumForCurrentPeak = 10+1=11. lastValidHeightRight = 1.
 *   rightPointer = 4: calculatedRightHeight = min(heights[4]=1, 1) = 1. sumForCurrentPeak = 11+1=12. lastValidHeightRight = 1.
 *   maxTotalHeight = max(13, 12) = 13
 * (Remaining peaks will not yield a higher sum in this example)
 * Final maxTotalHeight = 13.
 * Time Complexity: O(N^2)
 * Space Complexity: O(1)
 */
var maximumSumOfHeights = function (heights) {
  const totalTowers = heights.length;
  let maxTotalHeight = 0;

  for (
    let currentPeakIndex = 0;
    currentPeakIndex < totalTowers;
    currentPeakIndex++
  ) {
    let sumForCurrentPeak = heights[currentPeakIndex];
    let lastValidHeightLeft = heights[currentPeakIndex];

    for (
      let leftPointer = currentPeakIndex - 1;
      leftPointer >= 0;
      leftPointer--
    ) {
      const calculatedLeftHeight = Math.min(
        heights[leftPointer],
        lastValidHeightLeft
      );
      sumForCurrentPeak += calculatedLeftHeight;
      lastValidHeightLeft = calculatedLeftHeight;
    }

    let lastValidHeightRight = heights[currentPeakIndex];

    for (
      let rightPointer = currentPeakIndex + 1;
      rightPointer < totalTowers;
      rightPointer++
    ) {
      const calculatedRightHeight = Math.min(
        heights[rightPointer],
        lastValidHeightRight
      );
      sumForCurrentPeak += calculatedRightHeight;
      lastValidHeightRight = calculatedRightHeight;
    }

    maxTotalHeight = Math.max(maxTotalHeight, sumForCurrentPeak);
  }

  return maxTotalHeight;
};
