/**
 * Android Unlock Patterns
 * Time Complexity: O(N_dots * P(N_dots, n))
 * Space Complexity: O(n)
 */
var numberOfPatterns = function (m, n) {
    const skipMatrix = new Array(10).fill(null).map(() => new Array(10).fill(0));

    skipMatrix[1][3] = skipMatrix[3][1] = 2;
    skipMatrix[1][7] = skipMatrix[7][1] = 4;
    skipMatrix[3][9] = skipMatrix[9][3] = 6;
    skipMatrix[7][9] = skipMatrix[9][7] = 8;
    skipMatrix[1][9] = skipMatrix[9][1] = skipMatrix[2][8] = skipMatrix[8][2] = skipMatrix[3][7] = skipMatrix[7][3] = skipMatrix[4][6] = skipMatrix[6][4] = 5;

    const recursiveSolver = (currentPosition, patternVisited, patternLength) => {
        if (patternLength > n) {
            return 0;
        }

        let currentPatternCount = 0;
        if (patternLength >= m) {
            currentPatternCount = 1;
        }

        if (patternLength === n) {
            return currentPatternCount;
        }

        for (let potentialNext = 1; potentialNext <= 9; potentialNext++) {
            if (patternVisited.has(potentialNext) === false) {
                const passedThroughKey = skipMatrix[currentPosition][potentialNext];

                if (passedThroughKey === 0 || patternVisited.has(passedThroughKey)) {
                    patternVisited.add(potentialNext);
                    currentPatternCount += recursiveSolver(potentialNext, patternVisited, patternLength + 1);
                    patternVisited.delete(potentialNext);
                }
            }
        }
        return currentPatternCount;
    };

    let totalValidPatterns = 0;
    const initialVisitedSet = new Set();

    const startPoints = [1, 2, 5];
    const symmetryMultipliers = [4, 4, 1];

    for (let indexValue = 0; indexValue < startPoints.length; indexValue++) {
        const starterDot = startPoints[indexValue];
        const multiplierFactor = symmetryMultipliers[indexValue];

        initialVisitedSet.add(starterDot);
        totalValidPatterns += recursiveSolver(starterDot, initialVisitedSet, 1) * multiplierFactor;
        initialVisitedSet.delete(starterDot);
    }

    return totalValidPatterns;
};