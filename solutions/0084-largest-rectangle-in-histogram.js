/**
 * Largest Rectangle In Histogram
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
        while (indexStack.length > 0 && histogramBars[indexStack[indexStack.length - 1]] >= histogramBars[iteratorIdx]) {
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
        while (indexStack.length > 0 && histogramBars[indexStack[indexStack.length - 1]] >= histogramBars[iteratorIdx]) {
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
        const currentWidthCalc = rightBoundaryIndices[iteratorIdx] - leftBoundaryIndices[iteratorIdx] - 1;
        const potentialArea = histogramBars[iteratorIdx] * currentWidthCalc;
        if (potentialArea > maximumAchievedArea) {
            maximumAchievedArea = potentialArea;
        }
    }

    return maximumAchievedArea;
};