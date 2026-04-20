/**
 * Reverse Pairs
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
*/
var reversePairs = function (nums) {
    let totalReversePairs = 0;

    function sortAndCountPairs(workingArray, startIndex, endIndex) {
        if (startIndex >= endIndex) {
            return;
        }

        const midPoint = Math.floor((startIndex + endIndex) / 2);

        sortAndCountPairs(workingArray, startIndex, midPoint);
        sortAndCountPairs(workingArray, midPoint + 1, endIndex);

        let rightPointerForCounting = midPoint + 1;
        for (let leftPointerForCounting = startIndex; leftPointerForCounting <= midPoint; leftPointerForCounting++) {
            while (rightPointerForCounting <= endIndex && workingArray[leftPointerForCounting] > 2 * workingArray[rightPointerForCounting]) {
                rightPointerForCounting++;
            }
            totalReversePairs += (rightPointerForCounting - (midPoint + 1));
        }

        const temporaryMergedArray = [];
        let leftHalfCursor = startIndex;
        let rightHalfCursor = midPoint + 1;

        while (leftHalfCursor <= midPoint || rightHalfCursor <= endIndex) {
            if (leftHalfCursor <= midPoint && (rightHalfCursor > endIndex || workingArray[leftHalfCursor] <= workingArray[rightHalfCursor])) {
                temporaryMergedArray.push(workingArray[leftHalfCursor++]);
            } else if (rightHalfCursor <= endIndex) {
                temporaryMergedArray.push(workingArray[rightHalfCursor++]);
            }
        }

        for (let currentCopyIndex = 0; currentCopyIndex < temporaryMergedArray.length; currentCopyIndex++) {
            workingArray[startIndex + currentCopyIndex] = temporaryMergedArray[currentCopyIndex];
        }
    }

    sortAndCountPairs(nums, 0, nums.length - 1);
    return totalReversePairs;
};