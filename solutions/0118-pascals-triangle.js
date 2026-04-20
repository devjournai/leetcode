/**
 * Pascals Triangle
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

        for (let previousElementIndex = 0; previousElementIndex < previousSequence.length - 1; previousElementIndex++) {
            const sumOfElements = previousSequence[previousElementIndex] + previousSequence[previousElementIndex + 1];
            currentSequence.push(sumOfElements);
        }

        currentSequence.push(1);
        pascalsRows.push(currentSequence);
        rowCursor++;
    }

    return pascalsRows;
};