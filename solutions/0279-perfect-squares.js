/**
 * Perfect Squares
 * Time Complexity: O(N * sqrt(N))
 * Space Complexity: O(N)
*/
var numSquares = function (n) {
    const numbersToExplore = [n];
    const exploredNumbersSet = new Set();
    exploredNumbersSet.add(n);
    let currentPathLength = 0;

    while (numbersToExplore.length > 0) {
        currentPathLength++;
        let currentLevelSize = numbersToExplore.length;

        for (let currentLevelIndex = 0; currentLevelIndex < currentLevelSize; currentLevelIndex++) {
            let currentNumber = numbersToExplore.shift();

            for (let perfectSquareRoot = 1; ; perfectSquareRoot++) {
                let squareValue = perfectSquareRoot * perfectSquareRoot;
                if (squareValue > currentNumber) {
                    break;
                }

                let nextValueToReach = currentNumber - squareValue;

                if (nextValueToReach === 0) {
                    return currentPathLength;
                }

                if (!exploredNumbersSet.has(nextValueToReach)) {
                    exploredNumbersSet.add(nextValueToReach);
                    numbersToExplore.push(nextValueToReach);
                }
            }
        }
    }

    return -1;
};