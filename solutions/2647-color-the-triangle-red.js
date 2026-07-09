/**
* Color The Triangle Red
* Intuition: The problem describes a visual pattern of red triangles within a larger triangle. By observing the pattern for n=4, and analyzing the provided solution, it becomes clear that the selection of red triangles in each row follows a cyclic rule based on the row number's relationship to the total triangle side length. Specifically, the starting column for coloring and whether a row has only one red triangle or multiple red triangles depend on `(n - currentRow)` modulo 4 and modulo 2 respectively.
* Approach: 1. Initialize an array `redTriangles` to store the coordinates of the colored triangles, starting with the apex `[1, 1]`. 2. Define two constant arrays, `columnStartPattern` and `singleColorRowFlag`, which encapsulate the observed cyclic rules for determining the starting column and the single-color-row behavior. 3. Iterate `currentRow` from `2` up to `triangleSideLength`. 4. For each `currentRow`, calculate an `indexModulus` as `(triangleSideLength - currentRow)`. 5. Use `indexModulus % 4` to select the `initialColumn` from `columnStartPattern`. 6. Use `indexModulus % 2` to determine `isSingleColumnRow` from `singleColorRowFlag`. 7. Initialize `currentColumn` to `initialColumn`. 8. Use a `while` loop to add `[currentRow, currentColumn]` to `redTriangles` as long as `currentColumn` is less than `currentRow * 2`. If `isSingleColumnRow` is true, break the `while` loop after adding the first triangle for that row. 9. Increment `currentColumn` by 2 in each iteration of the `while` loop. 10. Return the `redTriangles` array.
* Dry Run: For n=3:
      - `triangleSideLength = 3`
      - `redTriangles = [[1, 1]]`
      - `columnStartPattern = [1, 2, 3, 1]`
      - `singleColorRowFlag = [0, 1]`
      - `currentRow = 2`:
        - `indexModulus = (3 - 2) = 1`
        - `initialColumn = columnStartPattern[1 % 4] = 2`
        - `isSingleColumnRow = singleColorRowFlag[1 % 2] = 1`
        - `currentColumn = 2`
        - `while (2 < 2 * 2)` (2 < 4):
          - `redTriangles.push([2, 2])`
          - `isSingleColumnRow` is 1, so `break`.
        - `redTriangles` is now `[[1, 1], [2, 2]]`
      - `currentRow = 3`:
        - `indexModulus = (3 - 3) = 0`
        - `initialColumn = columnStartPattern[0 % 4] = 1`
        - `isSingleColumnRow = singleColorRowFlag[0 % 2] = 0`
        - `currentColumn = 1`
        - `while (1 < 3 * 2)` (1 < 6):
          - `redTriangles.push([3, 1])`
          - `isSingleColumnRow` is 0, continue.
          - `currentColumn = 1 + 2 = 3`
        - `while (3 < 6)`:
          - `redTriangles.push([3, 3])`
          - `isSingleColumnRow` is 0, continue.
          - `currentColumn = 3 + 2 = 5`
        - `while (5 < 6)`:
          - `redTriangles.push([3, 5])`
          - `isSingleColumnRow` is 0, continue.
          - `currentColumn = 5 + 2 = 7`
        - `while (7 < 6)` is false, loop terminates.
        - `redTriangles` is now `[[1, 1], [2, 2], [3, 1], [3, 3], [3, 5]]`
      - Loop finishes.
      - Return `[[1, 1], [2, 2], [3, 1], [3, 3], [3, 5]]`.
* Time Complexity: O(n^2)
* Space Complexity: O(n^2)
*/
var colorRed = function (n) {
  const redTriangles = [[1, 1]];
  const columnStartPattern = [1, 2, 3, 1];
  const singleColorRowFlag = [0, 1];

  for (let currentRow = 2; currentRow <= n; currentRow++) {
    const indexModulus = n - currentRow;
    const initialColumn = columnStartPattern[indexModulus % 4];
    const isSingleColumnRow = singleColorRowFlag[indexModulus % 2];

    let currentColumn = initialColumn;
    while (currentColumn < currentRow * 2) {
      redTriangles.push([currentRow, currentColumn]);
      if (isSingleColumnRow) {
        break;
      }
      currentColumn += 2;
    }
  }

  return redTriangles;
};
