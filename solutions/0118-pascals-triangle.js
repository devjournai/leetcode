/**
 * Pascals Triangle
 * Intuition: Each interior entry is the sum of the two entries above it on the previous row, with 1s on both ends.
 * Approach: 1. numRows 0 → []. 2. Seed [[1]]. 3. For each later row, start with 1, then for each adjacent pair on the previous row push their sum, then close with 1.
 * Dry Run: numRows = 5. Rows: [1]; [1,1]; [1,2,1]; [1,3,3,1]; [1,4,6,4,1].
 * Time Complexity: O(numRows^2)
 * Space Complexity: O(numRows^2)
 */
var generate = function (numRows) {
  const pascalsRows = [];

  if (numRows === 0) {
    return pascalsRows;
  }

  pascalsRows.push([1]);

  let rowCursor = 1;
  while (rowCursor < numRows) {
    const previousSequence = pascalsRows[rowCursor - 1];
    const currentSequence = [1];

    for (
      let previousElementIndex = 0;
      previousElementIndex < previousSequence.length - 1;
      previousElementIndex++
    ) {
      const sumOfElements =
        previousSequence[previousElementIndex] +
        previousSequence[previousElementIndex + 1];
      currentSequence.push(sumOfElements);
    }

    currentSequence.push(1);
    pascalsRows.push(currentSequence);
    rowCursor++;
  }

  return pascalsRows;
};
