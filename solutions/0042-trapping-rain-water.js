/**
 * Trapping Rain Water
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var trap = function (height) {
    let structureLength = height.length;
    if (structureLength < 3) {
        return 0;
    }

    let maximumHeightsFromLeft = new Array(structureLength).fill(0);
    let currentHighestFromLeft = 0;

    for (let currentPosition = 0; currentPosition < structureLength; currentPosition++) {
        currentHighestFromLeft = Math.max(currentHighestFromLeft, height[currentPosition]);
        maximumHeightsFromLeft[currentPosition] = currentHighestFromLeft;
    }

    let maximumHeightsFromRight = new Array(structureLength).fill(0);
    let currentHighestFromRight = 0;

    for (let reversePosition = structureLength - 1; reversePosition >= 0; reversePosition--) {
        currentHighestFromRight = Math.max(currentHighestFromRight, height[reversePosition]);
        maximumHeightsFromRight[reversePosition] = currentHighestFromRight;
    }

    let totalTrappedVolume = 0;
    for (let computationPosition = 0; computationPosition < structureLength; computationPosition++) {
        let wallHeightLimit = Math.min(maximumHeightsFromLeft[computationPosition], maximumHeightsFromRight[computationPosition]);
        let actualWaterAccumulated = wallHeightLimit - height[computationPosition];
        if (actualWaterAccumulated > 0) {
            totalTrappedVolume += actualWaterAccumulated;
        }
    }

    return totalTrappedVolume;
};