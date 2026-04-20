/**
 * Rotate Function
 * Time Complexity: O(N)
 * Space Complexity: O(1)
*/
var maxRotateFunction = function (nums) {
    const numElementsInArray = nums.length;
    if (numElementsInArray === 0) {
        return 0;
    }

    const totalArraySum = nums.reduce((sumAccumulator, currentArrayValue) => sumAccumulator + currentArrayValue, 0);

    let initialRotationSummation = nums.reduce((fZeroAccumulator, arrayElementValue, arrayElementIndex) => fZeroAccumulator + arrayElementIndex * arrayElementValue, 0);

    let maxFunctionValue = initialRotationSummation;
    let currentCalculatedFunctionValue = initialRotationSummation;

    for (let rotationIterationStep = 1; rotationIterationStep < numElementsInArray; rotationIterationStep++) {
        const lastElementInPreviousRotation = nums[numElementsInArray - rotationIterationStep];
        currentCalculatedFunctionValue = currentCalculatedFunctionValue + totalArraySum - numElementsInArray * lastElementInPreviousRotation;
        maxFunctionValue = Math.max(maxFunctionValue, currentCalculatedFunctionValue);
    }

    return maxFunctionValue;
};