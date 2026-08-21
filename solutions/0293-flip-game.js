/**
 * Flip Game
 * Intuition: A legal move flips any two consecutive '+' to '--'. Collect every such next board.
 * Approach: 1. Scan i from 0 to n-2. 2. If currentState[i] and [i+1] are '+', push slice(0,i)+'--'+slice(i+2). 3. Return the list.
 * Dry Run: currentState = "++++".
 *   - i=0 → "--++". i=1 → "+--+". i=2 → "++--".
 *   - Return those three strings.
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

    if (charOne === "+" && charTwo === "+") {
      const startSegment = currentState.slice(0, iterateIndex);
      const endSegment = currentState.slice(iterateIndex + 2);
      const nextConfiguration = startSegment + "--" + endSegment;
      possibleNewStates.push(nextConfiguration);
    }
    iterateIndex++;
  }

  return possibleNewStates;
};
