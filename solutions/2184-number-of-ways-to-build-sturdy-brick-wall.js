/**
 * Number Of Ways To Build Sturdy Brick Wall
 * Intuition: The problem asks for the number of ways to stack rows of bricks such that no two adjacent rows have a vertical cut at the same position. This can be modeled as finding compatible patterns for each row.
 * Approach: 1. Generate all valid single-row patterns that sum up to the given width using the available bricks. 2. Build a compatibility graph where an edge exists between two patterns if they can be placed adjacently without coincident cuts. 3. Use dynamic programming where `dp[i]` represents the number of ways to build a wall of `k` rows, with the last row being pattern `i`. Iterate through `height` rows, updating the DP state based on compatible patterns from the previous row. 4. Sum up all valid ways for the final row. All calculations are done modulo 10^9 + 7.
 * Dry Run: height=2, width=3, bricks=[1,2]
 * 1. `recursivelyGeneratePatterns(0, [])`:
 *    - `[1,1,1]` (cuts at 1, 2)
 *    - `[1,2]` (cuts at 1)
 *    - `[2,1]` (cuts at 2)
 *    `allPossiblePatterns` = `[[1,1,1], [1,2], [2,1]]`
 * 2. `createCompatibilityGraph()`:
 *    - `doPatternsAlign([1,1,1], [1,1,1])`: cuts1={1,2}, cuts2={1,2}. Incompatible (false).
 *    - `doPatternsAlign([1,1,1], [1,2])`: cuts1={1,2}, cuts2={1}. Incompatible (false).
 *    - `doPatternsAlign([1,1,1], [2,1])`: cuts1={1,2}, cuts2={2}. Incompatible (false).
 *    - `doPatternsAlign([1,2], [1,1,1])`: cuts1={1}, cuts2={1,2}. Incompatible (false).
 *    - `doPatternsAlign([1,2], [1,2])`: cuts1={1}, cuts2={1}. Incompatible (false).
 *    - `doPatternsAlign([1,2], [2,1])`: cuts1={1}, cuts2={2}. Compatible (true). graph[1].push(2)
 *    - `doPatternsAlign([2,1], [1,1,1])`: cuts1={2}, cuts2={1,2}. Incompatible (false).
 *    - `doPatternsAlign([2,1], [1,2])`: cuts1={2}, cuts2={1}. Compatible (true). graph[2].push(1)
 *    - `doPatternsAlign([2,1], [2,1])`: cuts1={2}, cuts2={2}. Incompatible (false).
 *    `compatibilityLinkage` = `[[], [2], [1]]` (using 0-indexed patterns)
 * 3. DP:
 *    - `waysFromPreviousRow` = `[1,1,1]` (for the first row, any pattern is valid)
 *    - `currentLevelHeight = 1` (second row):
 *      - `waysForCurrentLevel` = `[0,0,0]`
 *      - `patternLayoutIndex = 0` (pattern `[1,1,1]`): `compatibilityLinkage[0]` is `[]`. `waysForCurrentLevel[0]` remains `0`.
 *      - `patternLayoutIndex = 1` (pattern `[1,2]`): `compatibilityLinkage[1]` is `[2]`.
 *        - `compatibleLayoutIndex = 2` (pattern `[2,1]`): `waysForCurrentLevel[1] = (0 + waysFromPreviousRow[2]) % MOD = (0 + 1) % MOD = 1`.
 *      - `patternLayoutIndex = 2` (pattern `[2,1]`): `compatibilityLinkage[2]` is `[1]`.
 *        - `compatibleLayoutIndex = 1` (pattern `[1,2]`): `waysForCurrentLevel[2] = (0 + waysFromPreviousRow[1]) % MOD = (0 + 1) % MOD = 1`.
 *      - `waysFromPreviousRow` becomes `[0,1,1]`.
 * 4. Return `waysFromPreviousRow.reduce((totalFinalWays, layoutCount) => (totalFinalWays + layoutCount) % MOD, 0)`: `(0 + 1 + 1) % MOD = 2`.
 * Time Complexity: O(W * N^2 + H * N^2)
 * Space Complexity: O(N * W + N^2)
 */
var buildWall = function (height, width, bricks) {
  const wallModuloValue = 1e9 + 7;
  const allPossiblePatterns = [];

  const recursivelyGeneratePatterns = (
    currentAccumulatedWidth,
    currentPatternSegment,
  ) => {
    if (currentAccumulatedWidth === width) {
      allPossiblePatterns.push([...currentPatternSegment]);
      return;
    }

    for (const singleBrickWidth of bricks) {
      if (currentAccumulatedWidth + singleBrickWidth <= width) {
        currentPatternSegment.push(singleBrickWidth);
        recursivelyGeneratePatterns(
          currentAccumulatedWidth + singleBrickWidth,
          currentPatternSegment,
        );
        currentPatternSegment.pop();
      }
    }
  };

  recursivelyGeneratePatterns(0, []);

  if (allPossiblePatterns.length === 0) {
    return 0;
  }

  const doPatternsAlign = (
    firstPatternArrangement,
    secondPatternArrangement,
  ) => {
    const cutsOfFirstPattern = new Set();
    const cutsOfSecondPattern = new Set();

    let currentPositionAccumulatorOne = 0;
    for (const currentBrickDimensionOne of firstPatternArrangement) {
      currentPositionAccumulatorOne += currentBrickDimensionOne;
      if (currentPositionAccumulatorOne < width) {
        cutsOfFirstPattern.add(currentPositionAccumulatorOne);
      }
    }

    let currentPositionAccumulatorTwo = 0;
    for (const currentBrickDimensionTwo of secondPatternArrangement) {
      currentPositionAccumulatorTwo += currentBrickDimensionTwo;
      if (currentPositionAccumulatorTwo < width) {
        cutsOfSecondPattern.add(currentPositionAccumulatorTwo);
      }
    }

    for (const potentialCutPoint of cutsOfFirstPattern) {
      if (cutsOfSecondPattern.has(potentialCutPoint)) {
        return false;
      }
    }

    return true;
  };

  const createCompatibilityGraph = () => {
    const compatibilityLinkage = Array.from(
      { length: allPossiblePatterns.length },
      () => [],
    );

    for (
      let firstPatternIdentifier = 0;
      firstPatternIdentifier < allPossiblePatterns.length;
      firstPatternIdentifier++
    ) {
      for (
        let secondPatternIdentifier = 0;
        secondPatternIdentifier < allPossiblePatterns.length;
        secondPatternIdentifier++
      ) {
        if (
          doPatternsAlign(
            allPossiblePatterns[firstPatternIdentifier],
            allPossiblePatterns[secondPatternIdentifier],
          )
        ) {
          compatibilityLinkage[firstPatternIdentifier].push(
            secondPatternIdentifier,
          );
        }
      }
    }

    return compatibilityLinkage;
  };

  const compatibilityLinkageMap = createCompatibilityGraph();
  let waysFromPreviousRow = new Array(allPossiblePatterns.length).fill(1);

  for (
    let currentLevelHeight = 1;
    currentLevelHeight < height;
    currentLevelHeight++
  ) {
    const waysForCurrentLevel = new Array(allPossiblePatterns.length).fill(0);

    for (
      let patternLayoutIndex = 0;
      patternLayoutIndex < allPossiblePatterns.length;
      patternLayoutIndex++
    ) {
      for (const compatibleLayoutIndex of compatibilityLinkageMap[
        patternLayoutIndex
      ]) {
        waysForCurrentLevel[patternLayoutIndex] =
          (waysForCurrentLevel[patternLayoutIndex] +
            waysFromPreviousRow[compatibleLayoutIndex]) %
          wallModuloValue;
      }
    }

    waysFromPreviousRow = waysForCurrentLevel;
  }

  return waysFromPreviousRow.reduce(
    (totalFinalWays, layoutCount) =>
      (totalFinalWays + layoutCount) % wallModuloValue,
    0,
  );
};
