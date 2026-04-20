/**
 * Flip Game
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
*/
var generatePossibleNextMoves = function (currentState) {
    const possibleNewStates = [];
    let iterateIndex = 0;
    const stateLength = currentState.length;

    while (iterateIndex < stateLength - 1) {
        const charOne = currentState[iterateIndex];
        const charTwo = currentState[iterateIndex + 1];

        if (charOne === '+' && charTwo === '+') {
            const startSegment = currentState.slice(0, iterateIndex);
            const endSegment = currentState.slice(iterateIndex + 2);
            const nextConfiguration = startSegment + '--' + endSegment;
            possibleNewStates.push(nextConfiguration);
        }
        iterateIndex++;
    }

    return possibleNewStates;
};