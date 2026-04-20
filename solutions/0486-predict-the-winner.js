/**
 * Predict The Winner
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
*/
var predictTheWinner = function (nums) {
    const totalNumbers = nums.length;
    const dynamicProgrammingTable = new Array(totalNumbers).fill(0);

    for (let rowIndex = totalNumbers - 1; rowIndex >= 0; rowIndex--) {
        dynamicProgrammingTable[rowIndex] = nums[rowIndex];

        for (let columnIndex = rowIndex + 1; columnIndex < totalNumbers; columnIndex++) {
            const scoreIfPickLeft = nums[rowIndex] - dynamicProgrammingTable[columnIndex];
            const scoreIfPickRight = nums[columnIndex] - dynamicProgrammingTable[columnIndex - 1];
            dynamicProgrammingTable[columnIndex] = Math.max(scoreIfPickLeft, scoreIfPickRight);
        }
    }

    return dynamicProgrammingTable[totalNumbers - 1] >= 0;
};