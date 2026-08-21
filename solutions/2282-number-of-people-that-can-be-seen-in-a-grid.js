/**
 * Number Of People That Can Be Seen In A Grid
 * Intuition: The problem requires counting visible people to the right OR below. This suggests processing each row independently for rightward visibility and each column independently for downward visibility. The condition "everyone in between them is shorter than both of them" implies a variant of the monotonic stack pattern, where people of equal or shorter height than the current person are 'seen' and popped, but an equal height person also acts as a blocker for any taller person beyond them.
 * Approach: 1. Initialize an `m x n` result matrix `visiblePeopleCount` with zeros. 2. Perform a row-wise scan: Iterate through each row from top to bottom. For each row, iterate from right to left (column `cols-1` down to `0`). Maintain a monotonic stack for the current row, storing heights in increasing order. When processing a person, pop all shorter or equal-height people from the stack, incrementing the count. If an equal-height person is popped, mark a flag. After popping, if the stack is not empty and no equal-height person was encountered, increment the count for the person at the top of the stack (the first taller person). Finally, push the current person's height onto the stack. 3. Perform a column-wise scan: Iterate through each column from left to right. For each column, iterate from bottom to top (row `rows-1` down to `0`). Use a separate monotonic stack for the current column and apply the same logic as the row-wise scan to update `visiblePeopleCount`. 4. Return the `visiblePeopleCount` matrix.
 * Dry Run: heights = [[3, 5], [4, 2]]
 * gridRowCount = 2, gridColCount = 2
 * visiblePeopleCount = [[0, 0], [0, 0]]
 *
 * --- Row Processing ---
 * rowIterator = 0 (row [3, 5]):
 *   rowMonotonicStack = []
 *   columnIterator = 1 (heights[0][1] = 5):
 *     currentPersonHeight = 5, isEqualHeightEncountered = false
 *     Stack ops: None. Push 5. rowMonotonicStack = [5]
 *   columnIterator = 0 (heights[0][0] = 3):
 *     currentPersonHeight = 3, isEqualHeightEncountered = false
 *     Stack ops: [5] is not <= 3. While loop skipped.
 *     If (stack.length > 0 && !isEqualHeightEncountered): true. visiblePeopleCount[0][0]++.
 *     visiblePeopleCount = [[1, 0], [0, 0]] (3 sees 5)
 *     Push 3. rowMonotonicStack = [5, 3]
 *
 * rowIterator = 1 (row [4, 2]):
 *   rowMonotonicStack = []
 *   columnIterator = 1 (heights[1][1] = 2):
 *     currentPersonHeight = 2, isEqualHeightEncountered = false
 *     Stack ops: None. Push 2. rowMonotonicStack = [2]
 *   columnIterator = 0 (heights[1][0] = 4):
 *     currentPersonHeight = 4, isEqualHeightEncountered = false
 *     Stack ops: [2] <= 4. Pop 2. visiblePeopleCount[1][0]++. (4 sees 2). rowMonotonicStack = []. isEqualHeightEncountered remains false.
 *     visiblePeopleCount = [[1, 0], [1, 0]]
 *     While loop condition (stack.length > 0) is false.
 *     If (stack.length > 0 && !isEqualHeightEncountered): false.
 *     Push 4. rowMonotonicStack = [4]
 *
 * After Row Processing: visiblePeopleCount = [[1, 0], [1, 0]]
 *
 * --- Column Processing ---
 * columnIteratorOuter = 0 (col [3, 4]):
 *   columnMonotonicStack = []
 *   rowIteratorInner = 1 (heights[1][0] = 4):
 *     individualHeight = 4, equalityIndicator = false
 *     Stack ops: None. Push 4. columnMonotonicStack = [4]
 *   rowIteratorInner = 0 (heights[0][0] = 3):
 *     individualHeight = 3, equalityIndicator = false
 *     Stack ops: [4] is not <= 3. While loop skipped.
 *     If (stack.length > 0 && !equalityIndicator): true. visiblePeopleCount[0][0]++.
 *     visiblePeopleCount = [[2, 0], [1, 0]] (3 sees 4)
 *     Push 3. columnMonotonicStack = [4, 3]
 *
 * columnIteratorOuter = 1 (col [5, 2]):
 *   columnMonotonicStack = []
 *   rowIteratorInner = 1 (heights[1][1] = 2):
 *     individualHeight = 2, equalityIndicator = false
 *     Stack ops: None. Push 2. columnMonotonicStack = [2]
 *   rowIteratorInner = 0 (heights[0][1] = 5):
 *     individualHeight = 5, equalityIndicator = false
 *     Stack ops: [2] <= 5. Pop 2. visiblePeopleCount[0][1]++. (5 sees 2). columnMonotonicStack = []. equalityIndicator remains false.
 *     visiblePeopleCount = [[2, 1], [1, 0]]
 *     While loop condition (stack.length > 0) is false.
 *     If (stack.length > 0 && !equalityIndicator): false.
 *     Push 5. columnMonotonicStack = [5]
 *
 * Final visiblePeopleCount = [[2, 1], [1, 0]]
 *
 * Time Complexity: O(M*N)
 * Space Complexity: O(M*N)
 */
var seePeople = function (heights) {
  const gridRowCount = heights.length;
  const gridColCount = heights[0].length;
  const visiblePeopleCount = Array.from({ length: gridRowCount }, () =>
    Array(gridColCount).fill(0)
  );

  for (let rowIterator = 0; rowIterator < gridRowCount; rowIterator++) {
    const rowMonotonicStack = [];
    for (
      let columnIterator = gridColCount - 1;
      columnIterator >= 0;
      columnIterator--
    ) {
      const currentPersonHeight = heights[rowIterator][columnIterator];
      let isEqualHeightEncountered = false;

      while (
        rowMonotonicStack.length > 0 &&
        rowMonotonicStack[rowMonotonicStack.length - 1] <= currentPersonHeight
      ) {
        if (
          rowMonotonicStack[rowMonotonicStack.length - 1] ===
          currentPersonHeight
        ) {
          isEqualHeightEncountered = true;
        }
        rowMonotonicStack.pop();
        visiblePeopleCount[rowIterator][columnIterator]++;
      }

      if (rowMonotonicStack.length > 0 && !isEqualHeightEncountered) {
        visiblePeopleCount[rowIterator][columnIterator]++;
      }
      rowMonotonicStack.push(currentPersonHeight);
    }
  }

  for (
    let columnIteratorOuter = 0;
    columnIteratorOuter < gridColCount;
    columnIteratorOuter++
  ) {
    const columnMonotonicStack = [];
    for (
      let rowIteratorInner = gridRowCount - 1;
      rowIteratorInner >= 0;
      rowIteratorInner--
    ) {
      const individualHeight = heights[rowIteratorInner][columnIteratorOuter];
      let equalityIndicator = false;

      while (
        columnMonotonicStack.length > 0 &&
        columnMonotonicStack[columnMonotonicStack.length - 1] <=
          individualHeight
      ) {
        if (
          columnMonotonicStack[columnMonotonicStack.length - 1] ===
          individualHeight
        ) {
          equalityIndicator = true;
        }
        columnMonotonicStack.pop();
        visiblePeopleCount[rowIteratorInner][columnIteratorOuter]++;
      }

      if (columnMonotonicStack.length > 0 && !equalityIndicator) {
        visiblePeopleCount[rowIteratorInner][columnIteratorOuter]++;
      }
      columnMonotonicStack.push(individualHeight);
    }
  }

  return visiblePeopleCount;
};
