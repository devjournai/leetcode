/**
 * Rotate Array
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var rotate = function (nums, k) {
    const arraySize = nums.length;

    if (arraySize === 0 || arraySize === 1) {
        return;
    }

    const rotationsCount = k % arraySize;

    if (rotationsCount === 0) {
        return;
    }

    const swapElements = (startIdx, endIdx) => {
        let leftBoundary = startIdx;
        let rightBoundary = endIdx;
        while (leftBoundary < rightBoundary) {
            const temporaryStorage = nums[leftBoundary];
            nums[leftBoundary] = nums[rightBoundary];
            nums[rightBoundary] = temporaryStorage;
            leftBoundary++;
            rightBoundary--;
        }
    };

    swapElements(0, arraySize - 1);
    swapElements(0, rotationsCount - 1);
    swapElements(rotationsCount, arraySize - 1);
};