/**
 * Count Of Smaller Numbers After Self
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
*/
var countSmaller = function (nums) {
    const inputLength = nums.length;
    if (inputLength === 0) {
        return [];
    }

    const indexedOriginals = new Array(inputLength);
    for (let currentNumberIndex = 0; currentNumberIndex < inputLength; currentNumberIndex++) {
        indexedOriginals[currentNumberIndex] = [nums[currentNumberIndex], currentNumberIndex];
    }

    const smallerCounts = new Array(inputLength).fill(0);
    const tempMergedArray = new Array(inputLength);

    const mergeSortProcedure = (startIndex, endIndex) => {
        if (startIndex >= endIndex) {
            return;
        }

        const midIndex = Math.floor((startIndex + endIndex) / 2);
        mergeSortProcedure(startIndex, midIndex);
        mergeSortProcedure(midIndex + 1, endIndex);

        let leftPartPointer = startIndex;
        let rightPartPointer = midIndex + 1;
        let tempArrayPointer = startIndex;
        let elementsFromRightCount = 0;

        while (leftPartPointer <= midIndex && rightPartPointer <= endIndex) {
            const leftElementValue = indexedOriginals[leftPartPointer][0];
            const rightElementValue = indexedOriginals[rightPartPointer][0];

            if (leftElementValue > rightElementValue) {
                tempMergedArray[tempArrayPointer] = indexedOriginals[rightPartPointer];
                elementsFromRightCount++;
                rightPartPointer++;
            } else {
                smallerCounts[indexedOriginals[leftPartPointer][1]] += elementsFromRightCount;
                tempMergedArray[tempArrayPointer] = indexedOriginals[leftPartPointer];
                leftPartPointer++;
            }
            tempArrayPointer++;
        }

        for (let remainingLeftIndex = leftPartPointer; remainingLeftIndex <= midIndex; remainingLeftIndex++) {
            smallerCounts[indexedOriginals[remainingLeftIndex][1]] += elementsFromRightCount;
            tempMergedArray[tempArrayPointer] = indexedOriginals[remainingLeftIndex];
            tempArrayPointer++;
        }

        for (let remainingRightIndex = rightPartPointer; remainingRightIndex <= endIndex; remainingRightIndex++) {
            tempMergedArray[tempArrayPointer] = indexedOriginals[remainingRightIndex];
            tempArrayPointer++;
        }

        for (let copyBackIndex = startIndex; copyBackIndex <= endIndex; copyBackIndex++) {
            indexedOriginals[copyBackIndex] = tempMergedArray[copyBackIndex];
        }
    };

    mergeSortProcedure(0, inputLength - 1);

    return smallerCounts;
};