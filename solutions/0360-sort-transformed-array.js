/**
 * Sort Transformed Array
 * Time Complexity: O(n)
 * Space Complexity: O(n)
*/
var sortTransformedArray = function (nums, a, b, c) {
    const applyTransformation = (inputNumber) => {
        return a * inputNumber * inputNumber + b * inputNumber + c;
    };

    const inputLength = nums.length;
    const finalResultArray = new Array(inputLength);

    let leftPointer = 0;
    let rightPointer = inputLength - 1;
    let currentWriteIndex;

    if (a >= 0) {
        currentWriteIndex = inputLength - 1;
        while (leftPointer <= rightPointer) {
            const transformedLeftValue = applyTransformation(nums[leftPointer]);
            const transformedRightValue = applyTransformation(nums[rightPointer]);

            if (transformedLeftValue > transformedRightValue) {
                finalResultArray[currentWriteIndex] = transformedLeftValue;
                leftPointer++;
            } else {
                finalResultArray[currentWriteIndex] = transformedRightValue;
                rightPointer--;
            }
            currentWriteIndex--;
        }
    } else {
        currentWriteIndex = 0;
        while (leftPointer <= rightPointer) {
            const transformedLeftValue = applyTransformation(nums[leftPointer]);
            const transformedRightValue = applyTransformation(nums[rightPointer]);

            if (transformedLeftValue < transformedRightValue) {
                finalResultArray[currentWriteIndex] = transformedLeftValue;
                leftPointer++;
            } else {
                finalResultArray[currentWriteIndex] = transformedRightValue;
                rightPointer--;
            }
            currentWriteIndex++;
        }
    }

    return finalResultArray;
};