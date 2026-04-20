/**
 * Self Crossing
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var isSelfCrossing = function (distanceSteps) {
    const totalSteps = distanceSteps.length;

    for (let currentMoveIndex = 3; currentMoveIndex < totalSteps; currentMoveIndex++) {
        const currentLength = distanceSteps[currentMoveIndex];
        const previousLengthOne = distanceSteps[currentMoveIndex - 1];
        const previousLengthTwo = distanceSteps[currentMoveIndex - 2];
        const previousLengthThree = distanceSteps[currentMoveIndex - 3];

        if (currentLength >= previousLengthTwo && previousLengthOne <= previousLengthThree) {
            return true;
        }
        if (currentMoveIndex >= 4) {
            const previousLengthFour = distanceSteps[currentMoveIndex - 4];
            if (previousLengthOne === previousLengthThree && currentLength + previousLengthFour >= previousLengthTwo) {
                return true;
            }
        }

        if (currentMoveIndex >= 5) {
            const previousLengthFour = distanceSteps[currentMoveIndex - 4];
            const previousLengthFive = distanceSteps[currentMoveIndex - 5];

            if (previousLengthTwo >= previousLengthFour &&
                currentLength + previousLengthFour >= previousLengthTwo &&
                previousLengthOne <= previousLengthThree &&
                previousLengthOne + previousLengthFive >= previousLengthThree) {
                return true;
            }
        }
    }

    return false;
};