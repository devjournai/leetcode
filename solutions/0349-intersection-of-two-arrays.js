/**
 * Intersection Of Two Arrays
 * Time Complexity: O(N + M)
 * Space Complexity: O(N + M)
*/
var intersection = function (numsArrayOne, numsArrayTwo) {
    const uniqueElementsFromFirst = new Set(numsArrayOne);
    const uniqueElementsFromSecond = numsArrayTwo.reduce((accumulatedSetForSecond, currentNumberFromSecond) => {
        accumulatedSetForSecond.add(currentNumberFromSecond);
        return accumulatedSetForSecond;
    }, new Set());

    const intersectionResultContainer = [];

    let iteratingSet;
    let checkingSet;

    if (uniqueElementsFromFirst.size < uniqueElementsFromSecond.size) {
        iteratingSet = uniqueElementsFromFirst;
        checkingSet = uniqueElementsFromSecond;
    } else {
        iteratingSet = uniqueElementsFromSecond;
        checkingSet = uniqueElementsFromFirst;
    }

    for (const valueFromIteratingSet of iteratingSet) {
        if (checkingSet.has(valueFromIteratingSet)) {
            intersectionResultContainer.push(valueFromIteratingSet);
        }
    }

    return intersectionResultContainer;
};