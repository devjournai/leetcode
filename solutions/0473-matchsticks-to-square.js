/**
 * Matchsticks To Square
 * Time Complexity: O(4^N)
 * Space Complexity: O(N)
 */
var makesquare = function (inputSticks) {
    if (inputSticks.length < 4) {
        return false;
    }

    const totalLength = inputSticks.reduce((acc, currentVal) => acc + currentVal, 0);
    if (totalLength % 4 !== 0) {
        return false;
    }

    const sideLength = totalLength / 4;
    inputSticks.sort((valA, valB) => valB - valA);

    if (inputSticks[0] > sideLength) {
        return false;
    }

    const currentSides = [0, 0, 0, 0];

    function solveRecursively(stickIndex) {
        if (stickIndex === inputSticks.length) {
            return true;
        }

        for (let currentSideIdx = 0; currentSideIdx < 4; currentSideIdx++) {
            if (currentSides[currentSideIdx] + inputSticks[stickIndex] <= sideLength) {
                currentSides[currentSideIdx] += inputSticks[stickIndex];
                if (solveRecursively(stickIndex + 1)) {
                    return true;
                }
                currentSides[currentSideIdx] -= inputSticks[stickIndex];
                if (currentSides[currentSideIdx] === 0) {
                    break;
                }
            }
        }
        return false;
    }

    return solveRecursively(0);
};