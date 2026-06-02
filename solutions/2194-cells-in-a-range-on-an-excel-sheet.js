/**
 * Cells In A Range On An Excel Sheet
 * Intuition: The problem describes a rectangular range of cells defined by start and end column characters and row numbers. To list all cells in this range, we need to iterate through each column from the start to the end, and for each column, iterate through each row from the start to the end.
 * Approach: 1. Parse the input string to extract the starting column character code, ending column character code, starting row number, and ending row number. 2. Initialize an empty array to store the resulting cell strings. 3. Use a nested loop structure: an outer loop iterates through column character codes from the start to the end. 4. An inner loop iterates through row numbers from the start to the end. 5. Inside the inner loop, convert the current column character code back to a character and concatenate it with the current row number to form a cell string. 6. Add this cell string to the result array. 7. After both loops complete, return the accumulated array of cell strings.
 * Dry Run: s = "A1:C2"
 *   initialColumnCode = 'A'.charCodeAt(0) = 65
 *   finalColumnCode = 'C'.charCodeAt(0) = 67
 *   initialRowValue = parseInt('1') = 1
 *   finalRowValue = parseInt('2') = 2
 *   cellStringsList = []
 *
 *   Outer loop (currentColumnCode from 65 to 67):
 *     currentColumnCode = 65 ('A'):
 *       Inner loop (currentRowNumber from 1 to 2):
 *         currentRowNumber = 1: constructedCell = 'A' + 1 = "A1". cellStringsList = ["A1"]
 *         currentRowNumber = 2: constructedCell = 'A' + 2 = "A2". cellStringsList = ["A1", "A2"]
 *     currentColumnCode = 66 ('B'):
 *       Inner loop (currentRowNumber from 1 to 2):
 *         currentRowNumber = 1: constructedCell = 'B' + 1 = "B1". cellStringsList = ["A1", "A2", "B1"]
 *         currentRowNumber = 2: constructedCell = 'B' + 2 = "B2". cellStringsList = ["A1", "A2", "B1", "B2"]
 *     currentColumnCode = 67 ('C'):
 *       Inner loop (currentRowNumber from 1 to 2):
 *         currentRowNumber = 1: constructedCell = 'C' + 1 = "C1". cellStringsList = ["A1", "A2", "B1", "B2", "C1"]
 *         currentRowNumber = 2: constructedCell = 'C' + 2 = "C2". cellStringsList = ["A1", "A2", "B1", "B2", "C1", "C2"]
 *
 *   Returns ["A1", "A2", "B1", "B2", "C1", "C2"]
 * Time Complexity: O((C2 - C1 + 1) * (R2 - R1 + 1))
 * Space Complexity: O((C2 - C1 + 1) * (R2 - R1 + 1))
 */
var cellsInRange = function (s) {
  const cellStringsList = [];
  const initialColumnCode = s.charCodeAt(0);
  const finalColumnCode = s.charCodeAt(3);
  const initialRowValue = parseInt(s[1], 10);
  const finalRowValue = parseInt(s[4], 10);

  for (
    let currentColumnCode = initialColumnCode;
    currentColumnCode <= finalColumnCode;
    currentColumnCode++
  ) {
    for (
      let currentRowNumber = initialRowValue;
      currentRowNumber <= finalRowValue;
      currentRowNumber++
    ) {
      const constructedCell =
        String.fromCharCode(currentColumnCode) + currentRowNumber;
      cellStringsList.push(constructedCell);
    }
  }

  return cellStringsList;
};
