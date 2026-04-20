/**
 * Candy
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var candy = function(ratings) {
    const totalChildren = ratings.length;
    const candiesGiven = new Array(totalChildren).fill(1);

    for (let childIndex = 1; childIndex < totalChildren; childIndex++) {
        if (ratings[childIndex] > ratings[childIndex - 1]) {
            candiesGiven[childIndex] = candiesGiven[childIndex - 1] + 1;
        }
    }

    for (let backwardIndex = totalChildren - 2; backwardIndex >= 0; backwardIndex--) {
        if (ratings[backwardIndex] > ratings[backwardIndex + 1]) {
            candiesGiven[backwardIndex] = Math.max(candiesGiven[backwardIndex], candiesGiven[backwardIndex + 1] + 1);
        }
    }

    let finalCandySum = 0;
    for (const individualCandy of candiesGiven) {
        finalCandySum += individualCandy;
    }

    return finalCandySum;
};