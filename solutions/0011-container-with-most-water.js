/**
 * Container With Most Water
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var maxArea = function (heightsArray) {
    let currentMaxArea = 0;
    let leftPointer = 0;
    let rightPointer = heightsArray.length - 1;

    while (leftPointer < rightPointer) {
        const currentHeight = Math.min(heightsArray[leftPointer], heightsArray[rightPointer]);
        const currentWidth = rightPointer - leftPointer;
        const potentialArea = currentHeight * currentWidth;
        currentMaxArea = Math.max(currentMaxArea, potentialArea);

        if (heightsArray[leftPointer] < heightsArray[rightPointer]) {
            leftPointer++;
        } else {
            rightPointer--;
        }
    }

    return currentMaxArea;
};