/**
 * 4sum
 * Time Complexity: O(N^3)
 * Space Complexity: O(1)
 */
var fourSum = function (inputNumbers, desiredTarget) {
    const arrayLength = inputNumbers.length;
    const foundQuadruplets = [];

    if (arrayLength < 4) {
        return foundQuadruplets;
    }

    inputNumbers.sort((valA, valB) => valA - valB);

    for (let indexOne = 0; indexOne < arrayLength - 3; indexOne++) {
        if (indexOne > 0 && inputNumbers[indexOne] === inputNumbers[indexOne - 1]) {
            continue;
        }

        for (let indexTwo = indexOne + 1; indexTwo < arrayLength - 2; indexTwo++) {
            if (indexTwo > indexOne + 1 && inputNumbers[indexTwo] === inputNumbers[indexTwo - 1]) {
                continue;
            }

            let leftPointer = indexTwo + 1;
            let rightPointer = arrayLength - 1;

            while (leftPointer < rightPointer) {
                const currentSum = inputNumbers[indexOne] + inputNumbers[indexTwo] + inputNumbers[leftPointer] + inputNumbers[rightPointer];

                if (currentSum === desiredTarget) {
                    foundQuadruplets.push([inputNumbers[indexOne], inputNumbers[indexTwo], inputNumbers[leftPointer], inputNumbers[rightPointer]]);

                    let distinctLeftValue = inputNumbers[leftPointer];
                    while (leftPointer < rightPointer && inputNumbers[leftPointer] === distinctLeftValue) {
                        leftPointer++;
                    }
                    let distinctRightValue = inputNumbers[rightPointer];
                    while (leftPointer < rightPointer && inputNumbers[rightPointer] === distinctRightValue) {
                        rightPointer--;
                    }
                } else if (currentSum < desiredTarget) {
                    leftPointer++;
                } else {
                    rightPointer--;
                }
            }
        }
    }

    return foundQuadruplets;
};