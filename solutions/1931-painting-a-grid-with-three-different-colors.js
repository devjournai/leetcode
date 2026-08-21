/**
 * Painting A Grid With Three Different Colors
 * Intuition: Adjacent cells (including vertically in a column and horizontally between columns) must differ. With `m ≤ 5`, all valid column colorings can be enumerated, then DP counts ways to place compatible columns across `n` columns.
 * Approach: 1. Recursively generate column patterns of height `m` with 3 colors and no two consecutive equal. 2. Two patterns are compatible if they differ in every row. 3. `waysToColorCurrentColumn[p]` starts at 1 (one way to use pattern `p` in column 0). 4. For each later column, add previous ways into compatible next patterns modulo 1e9+7. 5. Sum all patterns.
 * Dry Run: m=1, n=1 → patterns [0],[1],[2], each 1 way → 3.
 * Dry Run: m=1, n=2 → each column must differ from the previous → 3*2=6.
 * Time Complexity: O(N * (3 * 2^(M-1))^2 * M)
 * Space Complexity: O(M * 3 * 2^(M-1))
 */
var colorTheGrid = function (m, n) {
  const modulusValue = 1e9 + 7;
  const colorOptionsCount = 3;

  function generatePatternsForColumn(gridRows, availableColors) {
    const collectedPatterns = [];
    const currentPatternArray = [];

    function recursivePatternBuilder(
      currentRow,
      currentPatternArr,
      totalRows,
      numColors,
      allPatternsContainer
    ) {
      if (currentRow === totalRows) {
        allPatternsContainer.push([...currentPatternArr]);
        return;
      }

      for (let singleColor = 0; singleColor < numColors; singleColor++) {
        if (
          currentRow === 0 ||
          currentPatternArr[currentRow - 1] !== singleColor
        ) {
          currentPatternArr.push(singleColor);
          recursivePatternBuilder(
            currentRow + 1,
            currentPatternArr,
            totalRows,
            numColors,
            allPatternsContainer
          );
          currentPatternArr.pop();
        }
      }
    }

    recursivePatternBuilder(
      0,
      currentPatternArray,
      gridRows,
      availableColors,
      collectedPatterns
    );
    return collectedPatterns;
  }

  function checkVerticalCompatibility(firstPatternArr, secondPatternArr) {
    for (
      let rowIterator = 0;
      rowIterator < firstPatternArr.length;
      rowIterator++
    ) {
      if (firstPatternArr[rowIterator] === secondPatternArr[rowIterator]) {
        return false;
      }
    }
    return true;
  }

  const allValidPatterns = generatePatternsForColumn(m, colorOptionsCount);
  const numberOfPatterns = allValidPatterns.length;

  let waysToColorCurrentColumn = new Array(numberOfPatterns).fill(1);

  for (
    let currentColumnIndex = 1;
    currentColumnIndex < n;
    currentColumnIndex++
  ) {
    const nextWaysToColorColumn = new Array(numberOfPatterns).fill(0);
    for (
      let previousPatternIndex = 0;
      previousPatternIndex < numberOfPatterns;
      previousPatternIndex++
    ) {
      for (
        let currentPatternIndex = 0;
        currentPatternIndex < numberOfPatterns;
        currentPatternIndex++
      ) {
        if (
          checkVerticalCompatibility(
            allValidPatterns[previousPatternIndex],
            allValidPatterns[currentPatternIndex]
          )
        ) {
          nextWaysToColorColumn[currentPatternIndex] =
            (nextWaysToColorColumn[currentPatternIndex] +
              waysToColorCurrentColumn[previousPatternIndex]) %
            modulusValue;
        }
      }
    }
    waysToColorCurrentColumn = nextWaysToColorColumn;
  }

  let finalTotalWays = 0;
  for (const singlePatternWay of waysToColorCurrentColumn) {
    finalTotalWays = (finalTotalWays + singlePatternWay) % modulusValue;
  }

  return finalTotalWays;
};
