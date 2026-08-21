/**
 * The Score Of Students Solving Math Expression
 * Intuition: This problem asks to score student answers based on two criteria: perfect correctness (5 points) and "operator misapplication" correctness (2 points). The "operator misapplication" implies calculating the expression with non-standard operator precedence (e.g., evaluating addition before multiplication, or any other arbitrary order of operations). This suggests an approach where we generate *all* possible numerical results that can be obtained by evaluating the expression with different operator orders. This is a classic problem structure for dynamic programming (specifically, interval DP or "parenthesization" DP), where we compute all possible outcomes for every sub-expression.
 * Approach: 1. Calculate the `exactAnswer` by correctly evaluating the input `expressionString` using standard operator precedence. This can be done by using `eval()` after ensuring proper spacing for unambiguous parsing. 2. Initialize a memoization map, `memoizedResults`, to store `Set`s of possible numerical outcomes for each sub-expression `[currentStartIdx, currentEndIdx]`. The key for the map will be a string like "start,end". 3. Define a recursive helper function, `calculateAllPossibleResults(currentStartIdx, currentEndIdx)`, which computes and returns a `Set` of all valid numerical results for the substring `expressionString[currentStartIdx...currentEndIdx]`, ensuring all results are <= 1000. 4. Base Case for `calculateAllPossibleResults`: If `currentStartIdx` equals `currentEndIdx`, it means we have a single digit. Convert this digit to a number and return a `Set` containing only this number. 5. Recursive Step: Iterate `operatorPosition` from `currentStartIdx + 1` to `currentEndIdx - 1` with a step of 2 (to only land on operators). For each `operatorPosition`: a. Recursively call `calculateAllPossibleResults` for the left sub-expression `[currentStartIdx, operatorPosition - 1]` to get `leftValuesSet`. b. Recursively call `calculateAllPossibleResults` for the right sub-expression `[operatorPosition + 1, currentEndIdx]` to get `rightValuesSet`. c. Get the `operationChar` at `operatorPosition`. d. Iterate through every `leftOperand` in `leftValuesSet` and every `rightOperand` in `rightValuesSet`. e. Compute `combinedValue` based on `operationChar` (`+` or `*`). f. If `combinedValue` is less than or equal to 1000, add it to the `possibleOutcomesSet` for the current `[currentStartIdx, currentEndIdx]` interval. 6. Memoize `possibleOutcomesSet` and return it. 7. After the initial call to `calculateAllPossibleResults(0, expressionLength - 1)`, we will have `allMisinterpretedResults` (a `Set`) containing all numbers achievable through misinterpreting operator precedence (and also the `exactAnswer` if it falls within the `1000` limit and is formed this way). 8. Initialize `totalScoreAccumulator` to 0. 9. Iterate through each `studentSubmittedAnswer` in the input `studentResponses` array. a. If `studentSubmittedAnswer` equals `exactAnswer`, add 5 to `totalScoreAccumulator`. b. Else if `allMisinterpretedResults` contains `studentSubmittedAnswer` (and it's not the `exactAnswer`), add 2 to `totalScoreAccumulator`. c. Otherwise, add 0. 10. Return `totalScoreAccumulator`.
 * Dry Run: s = "1+2*3", answers = [7, 9, 1001]
 * 1. `exactAnswer` = `eval("1 + 2 * 3")` = 7.
 * 2. `expressionLength` = 5.
 * 3. Call `calculateAllPossibleResults(0, 4)` for "1+2*3":
 *    - Cache check for "0,4" (miss). `possibleOutcomesSet` = new Set().
 *    - Loop `operatorPosition` from 1 to 3 (step 2):
 *      - `operatorPosition` = 1 (char '+'):
 *        - `leftValuesSet` = `calculateAllPossibleResults(0, 0)` for "1" -> `{1}` (memoized "0,0")
 *        - `rightValuesSet` = `calculateAllPossibleResults(2, 4)` for "2*3":
 *          - Cache check for "2,4" (miss). `innerPossibleOutcomesSet` = new Set().
 *          - Loop `innerOperatorPosition` from 3 to 3 (step 2):
 *            - `innerOperatorPosition` = 3 (char '*'):
 *              - `innerLeftValuesSet` = `calculateAllPossibleResults(2, 2)` for "2" -> `{2}` (memoized "2,2")
 *              - `innerRightValuesSet` = `calculateAllPossibleResults(4, 4)` for "3" -> `{3}` (memoized "4,4")
 *              - `innerOperationChar` = '*'.
 *              - For `leftOperand=2`, `rightOperand=3`: `combinedValue` = `2 * 3 = 6`. `6 <= 1000`, add 6 to `innerPossibleOutcomesSet`.
 *          - Memoize "2,4" with `{6}`. Return `{6}`.
 *        - `leftValuesSet` = `{1}`, `rightValuesSet` = `{6}`. `operationChar` = '+'.
 *        - For `leftOperand=1`, `rightOperand=6`: `combinedValue` = `1 + 6 = 7`. `7 <= 1000`, add 7 to `possibleOutcomesSet`.
 *      - `operatorPosition` = 3 (char '*'):
 *        - `leftValuesSet` = `calculateAllPossibleResults(0, 2)` for "1+2":
 *          - Cache check for "0,2" (miss). `anotherInnerPossibleOutcomesSet` = new Set().
 *          - Loop `evenAnotherOperatorPosition` from 1 to 1 (step 2):
 *            - `evenAnotherOperatorPosition` = 1 (char '+'):
 *              - `evenAnotherLeftValuesSet` = `calculateAllPossibleResults(0, 0)` for "1" -> `{1}` (memoized "0,0")
 *              - `evenAnotherRightValuesSet` = `calculateAllPossibleResults(2, 2)` for "2" -> `{2}` (memoized "2,2")
 *              - `evenAnotherOperationChar` = '+'.
 *              - For `leftOperand=1`, `rightOperand=2`: `combinedValue` = `1 + 2 = 3`. `3 <= 1000`, add 3 to `anotherInnerPossibleOutcomesSet`.
 *          - Memoize "0,2" with `{3}`. Return `{3}`.
 *        - `rightValuesSet` = `calculateAllPossibleResults(4, 4)` for "3" -> `{3}` (memoized "4,4")
 *        - `leftValuesSet` = `{3}`, `rightValuesSet` = `{3}`. `operationChar` = '*'.
 *        - For `leftOperand=3`, `rightOperand=3`: `combinedValue` = `3 * 3 = 9`. `9 <= 1000`, add 9 to `possibleOutcomesSet`.
 *    - Memoize "0,4" with `{7, 9}`. `allMisinterpretedResults` = `{7, 9}`.
 * 4. `totalScoreAccumulator` = 0.
 * 5. For `studentSubmittedAnswer` = 7: `7 === exactAnswer` (7). `totalScoreAccumulator` = 5.
 * 6. For `studentSubmittedAnswer` = 9: `9 !== exactAnswer` (7). `allMisinterpretedResults.has(9)` is true. `totalScoreAccumulator` = 5 + 2 = 7.
 * 7. For `studentSubmittedAnswer` = 1001: `1001 !== exactAnswer` (7). `allMisinterpretedResults.has(1001)` is false. `totalScoreAccumulator` remains 7.
 * 8. Return `totalScoreAccumulator` = 7.
 * Time Complexity: O(N^3 * K^2)
 * Space Complexity: O(N^2 * K)
 */
var scoreOfStudents = function (s, answers) {
  const exactAnswer = eval(s.replace(/(\d)([*+])/g, "$1 $2 "));

  const expressionLength = s.length;
  const memoizedResults = new Map();

  function calculateAllPossibleResults(currentStartIdx, currentEndIdx) {
    const memoKey = `${currentStartIdx},${currentEndIdx}`;
    if (memoizedResults.has(memoKey)) {
      return memoizedResults.get(memoKey);
    }

    const possibleOutcomesSet = new Set();
    if (currentStartIdx === currentEndIdx) {
      possibleOutcomesSet.add(Number(s[currentStartIdx]));
      memoizedResults.set(memoKey, possibleOutcomesSet);
      return possibleOutcomesSet;
    }

    for (
      let operatorPosition = currentStartIdx + 1;
      operatorPosition < currentEndIdx;
      operatorPosition += 2
    ) {
      const leftValuesSet = calculateAllPossibleResults(
        currentStartIdx,
        operatorPosition - 1
      );
      const rightValuesSet = calculateAllPossibleResults(
        operatorPosition + 1,
        currentEndIdx
      );
      const operationChar = s[operatorPosition];

      for (const leftOperand of leftValuesSet) {
        for (const rightOperand of rightValuesSet) {
          let combinedValue;
          if (operationChar === "+") {
            combinedValue = leftOperand + rightOperand;
          } else {
            combinedValue = leftOperand * rightOperand;
          }

          if (combinedValue <= 1000) {
            possibleOutcomesSet.add(combinedValue);
          }
        }
      }
    }

    memoizedResults.set(memoKey, possibleOutcomesSet);
    return possibleOutcomesSet;
  }

  const allMisinterpretedResults = calculateAllPossibleResults(
    0,
    expressionLength - 1
  );
  let totalScoreAccumulator = 0;

  for (const studentSubmittedAnswer of answers) {
    if (studentSubmittedAnswer === exactAnswer) {
      totalScoreAccumulator += 5;
    } else if (allMisinterpretedResults.has(studentSubmittedAnswer)) {
      totalScoreAccumulator += 2;
    }
  }

  return totalScoreAccumulator;
};
