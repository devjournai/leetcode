/**
 * Frog Jump
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
*/
var canCross = function (stonesInputArray) {
    if (stonesInputArray.length === 0) {
        return false;
    }

    if (stonesInputArray.length === 1) {
        return true;
    }

    const lastStoneValue = stonesInputArray[stonesInputArray.length - 1];
    const stonePositionMapper = new Map();
    for (let currentStoneIndex = 0; currentStoneIndex < stonesInputArray.length; currentStoneIndex++) {
        stonePositionMapper.set(stonesInputArray[currentStoneIndex], currentStoneIndex);
    }

    const memoizationRecords = new Map();

    const recursiveJumpSolver = (currentStoneLocation, previousJumpMagnitude) => {
        const stateIdentifier = `${currentStoneLocation}:${previousJumpMagnitude}`;
        if (memoizationRecords.has(stateIdentifier)) {
            return memoizationRecords.get(stateIdentifier);
        }

        if (currentStoneLocation === lastStoneValue) {
            return true;
        }

        const nextPotentialJumpSizes = [
            previousJumpMagnitude - 1,
            previousJumpMagnitude,
            previousJumpMagnitude + 1
        ];

        for (let iterationIndex = 0; iterationIndex < nextPotentialJumpSizes.length; iterationIndex++) {
            const candidateJumpSize = nextPotentialJumpSizes[iterationIndex];
            if (candidateJumpSize <= 0) {
                continue;
            }

            const targetStoneLocation = currentStoneLocation + candidateJumpSize;

            if (targetStoneLocation > lastStoneValue) {
                continue;
            }

            if (stonePositionMapper.has(targetStoneLocation)) {
                if (recursiveJumpSolver(targetStoneLocation, candidateJumpSize)) {
                    memoizationRecords.set(stateIdentifier, true);
                    return true;
                }
            }
        }

        memoizationRecords.set(stateIdentifier, false);
        return false;
    };
    return recursiveJumpSolver(0, 0);
};