/**
 * Find Missing And Repeated Values
 * Intuition: The problem requires finding a duplicate number and a missing number within a specific range (1 to n*n) in a 2D grid. The core idea is to leverage a set data structure to efficiently track which numbers have been encountered. By doing so, we can identify the repeated number as soon as it's seen again. For the missing number, we can compare the sum of all unique numbers present in the grid with the expected sum of all numbers in the theoretical range.
 * Approach: 1. Determine the maximum possible value (n*n) and the grid's dimension (n). 2. Initialize a Set to store all unique numbers encountered, a variable to hold the repeated number, and a variable to accumulate the sum of these unique numbers. 3. Iterate through each cell of the grid using nested loops. For each number, check if it's already in the Set. If it is, that number is the repeated one. If not, add it to the Set and add its value to the sum of unique numbers. 4. After processing all elements, calculate the expected sum of numbers from 1 to n*n using the arithmetic series formula: `N * (N + 1) / 2`. 5. The missing number is then derived by subtracting the accumulated sum of unique numbers from the calculated expected total sum. 6. Return the identified repeated number and the calculated missing number in an array.
 * Dry Run: grid = [[1,3],[3,2]]
 *   gridDimension = 2
 *   maximumPossibleValue = 2 * 2 = 4
 *
 *   encounteredElements = new Set()
 *   identifiedRepeated = -1
 *   sumOfUniquePresent = 0
 *
 *   Loop through grid:
 *   (rowIndex=0, colIndex=0): currentValueFromGrid = 1.
 *     encounteredElements.has(1) is false.
 *     encounteredElements.add(1). Set is {1}.
 *     sumOfUniquePresent = 0 + 1 = 1.
 *
 *   (rowIndex=0, colIndex=1): currentValueFromGrid = 3.
 *     encounteredElements.has(3) is false.
 *     encounteredElements.add(3). Set is {1, 3}.
 *     sumOfUniquePresent = 1 + 3 = 4.
 *
 *   (rowIndex=1, colIndex=0): currentValueFromGrid = 3.
 *     encounteredElements.has(3) is true.
 *     identifiedRepeated = 3.
 *
 *   (rowIndex=1, colIndex=1): currentValueFromGrid = 2.
 *     encounteredElements.has(2) is false.
 *     encounteredElements.add(2). Set is {1, 3, 2}.
 *     sumOfUniquePresent = 4 + 2 = 6.
 *
 *   End of loops.
 *   identifiedRepeated = 3
 *   sumOfUniquePresent = 6
 *
 *   seriesExpectedSum = maximumPossibleValue * (maximumPossibleValue + 1) / 2
 *   seriesExpectedSum = 4 * (4 + 1) / 2 = 4 * 5 / 2 = 10.
 *
 *   calculatedMissing = seriesExpectedSum - sumOfUniquePresent
 *   calculatedMissing = 10 - 6 = 4.
 *
 *   Return [identifiedRepeated, calculatedMissing] = [3, 4].
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var findMissingAndRepeatedValues = function (grid) {
  const gridDimension = grid.length;
  const maximumPossibleValue = gridDimension * gridDimension;

  const encounteredElements = new Set();
  let identifiedRepeated = -1;
  let sumOfUniquePresent = 0;

  for (let rowIndex = 0; rowIndex < gridDimension; rowIndex++) {
    for (let colIndex = 0; colIndex < gridDimension; colIndex++) {
      const currentValueFromGrid = grid[rowIndex][colIndex];
      if (encounteredElements.has(currentValueFromGrid)) {
        identifiedRepeated = currentValueFromGrid;
      } else {
        encounteredElements.add(currentValueFromGrid);
        sumOfUniquePresent += currentValueFromGrid;
      }
    }
  }

  const seriesExpectedSum =
    (maximumPossibleValue * (maximumPossibleValue + 1)) / 2;
  const calculatedMissing = seriesExpectedSum - sumOfUniquePresent;

  return [identifiedRepeated, calculatedMissing];
};
