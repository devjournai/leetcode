/**
 * Largest Rectangle In Histogram
 * Intuition: The largest rectangle using bar i as height spans from the nearest strictly shorter bar on the left to the nearest strictly shorter bar on the right.
 * Approach: 1. Monotonic increasing index stack left-to-right: for each i, pop ≥ heights, left[i] = stack top or -1. 2. Same right-to-left for right[i] = stack top or n. 3. Area_i = height[i] * (right[i] - left[i] - 1); take the max.
 * Dry Run: [2,1,5,6,2,3] → bar 5 spans indices 2–3 (width 2) area 10; bar 2 at index 4 spans 2–5 width 4 area 8; max 10
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var largestRectangleArea = function (histogramBars) {
  const numberBars = histogramBars.length;
  if (numberBars === 0) {
    return 0;
  }

  const leftBoundaryIndices = new Array(numberBars);
  const rightBoundaryIndices = new Array(numberBars);
  const indexStack = [];

  for (let iteratorIdx = 0; iteratorIdx < numberBars; iteratorIdx++) {
    while (
      indexStack.length > 0 &&
      histogramBars[indexStack[indexStack.length - 1]] >=
        histogramBars[iteratorIdx]
    ) {
      indexStack.pop();
    }
    if (indexStack.length === 0) {
      leftBoundaryIndices[iteratorIdx] = -1;
    } else {
      leftBoundaryIndices[iteratorIdx] = indexStack[indexStack.length - 1];
    }
    indexStack.push(iteratorIdx);
  }

  indexStack.length = 0;

  for (let iteratorIdx = numberBars - 1; iteratorIdx >= 0; iteratorIdx--) {
    while (
      indexStack.length > 0 &&
      histogramBars[indexStack[indexStack.length - 1]] >=
        histogramBars[iteratorIdx]
    ) {
      indexStack.pop();
    }
    if (indexStack.length === 0) {
      rightBoundaryIndices[iteratorIdx] = numberBars;
    } else {
      rightBoundaryIndices[iteratorIdx] = indexStack[indexStack.length - 1];
    }
    indexStack.push(iteratorIdx);
  }

  let maximumAchievedArea = 0;
  for (let iteratorIdx = 0; iteratorIdx < numberBars; iteratorIdx++) {
    const currentWidthCalc =
      rightBoundaryIndices[iteratorIdx] - leftBoundaryIndices[iteratorIdx] - 1;
    const potentialArea = histogramBars[iteratorIdx] * currentWidthCalc;
    if (potentialArea > maximumAchievedArea) {
      maximumAchievedArea = potentialArea;
    }
  }

  return maximumAchievedArea;
};
