/**
 * Check If An Original String Exists Given Two Encoded Strings
 * Intuition: This problem can be modeled as finding a path in a state-space graph using dynamic programming with memoization. The key insight is to track the difference in "length covered" by the two encoded strings. A positive difference indicates string one has covered more characters, a negative difference indicates string two has covered more, and zero means they are aligned.
 * Approach:
 * 1. Initialize a 3D memoization table `dynamicProgrammingTable` where `dynamicProgrammingTable[idxOne][idxTwo][lengthDiff]` stores whether it's possible to match the suffixes starting at `idxOne` and `idxTwo` with the given `lengthDiff`. The third dimension `lengthDiff` needs to accommodate both positive and negative differences; using an object as the innermost dimension allows direct mapping of `lengthDiff` values.
 * 2. Define a recursive helper function `checkPossibility(idxOne, idxTwo, lengthDiff)`:
 *    a. Base Case 1: If both `idxOne` and `idxTwo` have reached the end of their respective strings (`firstString.length` and `secondString.length`), return `true` if and only if `lengthDiff` is `0`, indicating a perfect match.
 *    b. Memoization Check: If `dynamicProgrammingTable[idxOne][idxTwo][lengthDiff]` already contains a result, return it.
 *    c. Recursive Transitions: Explore all possible ways to advance in `firstString` and `secondString`:
 *       i. Character Match (when `lengthDiff` is `0`): If both current characters (`currentCharAtOne`, `currentCharAtTwo`) are identical letters and `lengthDiff` is `0`, try matching them by advancing both pointers (`idxOne + 1`, `idxTwo + 1`) with `lengthDiff` remaining `0`. This check also ensures `currentCharAtOne` is a letter (not a digit).
 *       ii. Consume Character in `firstString` (when `lengthDiff < 0`): If `currentCharAtOne` is a letter and `lengthDiff` is negative (meaning `secondString` has covered more), try advancing `idxOne` by one character to reduce the deficit (`idxOne + 1`, `idxTwo`, `lengthDiff + 1`).
 *       iii. Consume Character in `secondString` (when `lengthDiff > 0`): If `currentCharAtTwo` is a letter and `lengthDiff` is positive (meaning `firstString` has covered more), try advancing `idxTwo` by one character to reduce the surplus (`idxOne`, `idxTwo + 1`, `lengthDiff - 1`).
 *       iv. Parse Numbers in `firstString`: Iterate through 1 to 3 consecutive digits starting at `idxOne`. Convert these digits into a number `parsedNumberFromOne`. Recursively call `checkPossibility` with `idxOne` advanced by the length of `parsedNumberFromOne` (i.e., `idxOne + digitAdvanceOne + 1`), `idxTwo` unchanged, and `lengthDiff` increased by `parsedNumberFromOne` (`idxOne + digitAdvanceOne + 1`, `idxTwo`, `lengthDiff + parsedNumberFromOne`).
 *       v. Parse Numbers in `secondString`: Similarly, iterate through 1 to 3 consecutive digits starting at `idxTwo`. Convert these digits into a number `parsedNumberFromTwo`. Recursively call `checkPossibility` with `idxOne` unchanged, `idxTwo` advanced by the length of `parsedNumberFromTwo` (i.e., `idxTwo + digitAdvanceTwo + 1`), and `lengthDiff` decreased by `parsedNumberFromTwo` (`idxOne`, `idxTwo + digitAdvanceTwo + 1`, `lengthDiff - parsedNumberFromTwo`).
 *    d. Store and Return: If any of the recursive calls return `true`, store `true` in `dynamicProgrammingTable` and return `true`. Otherwise, store `false` and return `false`.
 * 3. Initiate the recursive process by calling `checkPossibility(0, 0, 0)`.
 * Dry Run: For `s1 = "ab1"`, `s2 = "2b"`
 * `checkPossibility(0, 0, 0)`:
 *   `idxOne = 0`, `idxTwo = 0`, `lengthDiff = 0`.
 *   `currentCharAtOne = 'a'`, `currentCharAtTwo = '2'`.
 *   1. No direct char match (`'a' !== '2'`).
 *   2. `idxOne < s1.length` (0<3), `isNaN('a')` is true, `lengthDiff` (0) is not `< 0`. Skip.
 *   3. `idxTwo < s2.length` (0<2), `isNaN('2')` is false. Skip.
 *   4. Parse numbers in `s1`:
 *      `digitAdvanceOne = 0`: `s1[0]` is 'a'. `isNaN('a')` is true. Break the loop.
 *   5. Parse numbers in `s2`:
 *      `digitAdvanceTwo = 0`: `s2[0]` is '2'. `parsedNumberFromTwo = 2`.
 *         Recursively call `checkPossibility(0, 0 + 0 + 1, 0 - 2)` which is `checkPossibility(0, 1, -2)`.
 *         `checkPossibility(0, 1, -2)`:
 *           `idxOne = 0`, `idxTwo = 1`, `lengthDiff = -2`.
 *           `currentCharAtOne = 'a'`, `currentCharAtTwo = 'b'`.
 *           1. No direct char match (`lengthDiff` is not 0).
 *           2. `idxOne < s1.length` (0<3), `isNaN('a')` is true, `lengthDiff` (-2) is `< 0`. This path taken:
 *              Recursively call `checkPossibility(0 + 1, 1, -2 + 1)` which is `checkPossibility(1, 1, -1)`.
 *              `checkPossibility(1, 1, -1)`:
 *                `idxOne = 1`, `idxTwo = 1`, `lengthDiff = -1`.
 *                `currentCharAtOne = 'b'`, `currentCharAtTwo = 'b'`.
 *                1. No direct char match (`lengthDiff` is not 0).
 *                2. `idxOne < s1.length` (1<3), `isNaN('b')` is true, `lengthDiff` (-1) is `< 0`. This path taken:
 *                   Recursively call `checkPossibility(1 + 1, 1, -1 + 1)` which is `checkPossibility(2, 1, 0)`.
 *                   `checkPossibility(2, 1, 0)`:
 *                     `idxOne = 2`, `idxTwo = 1`, `lengthDiff = 0`.
 *                     `currentCharAtOne = '1'`, `currentCharAtTwo = 'b'`.
 *                     1. No direct char match (`'1' !== 'b'`).
 *                     2. `idxOne < s1.length` (2<3), `isNaN('1')` is false. Skip.
 *                     3. `idxTwo < s2.length` (1<2), `isNaN('b')` is true, `lengthDiff` (0) is not `> 0`. Skip.
 *                     4. Parse numbers in `s1`:
 *                        `digitAdvanceOne = 0`: `s1[2]` is '1'. `parsedNumberFromOne = 1`.
 *                           Recursively call `checkPossibility(2 + 0 + 1, 1, 0 + 1)` which is `checkPossibility(3, 1, 1)`.
 *                           `checkPossibility(3, 1, 1)`:
 *                             `idxOne = 3` (end of `s1`), `idxTwo = 1`, `lengthDiff = 1`.
 *                             `currentCharAtOne = undefined`, `currentCharAtTwo = 'b'`.
 *                             1. Not end of both strings.
 *                             2. `idxOne` (3) is not `< s1.length`. Skip.
 *                             3. `idxTwo < s2.length` (1<2), `isNaN('b')` is true, `lengthDiff` (1) is `> 0`. This path taken:
 *                                Recursively call `checkPossibility(3, 1 + 1, 1 - 1)` which is `checkPossibility(3, 2, 0)`.
 *                                `checkPossibility(3, 2, 0)`:
 *                                  `idxOne = 3` (end of `s1`), `idxTwo = 2` (end of `s2`), `lengthDiff = 0`.
 *                                  Base case: both ended, `lengthDiff = 0`. Returns `true`.
 *                                `checkPossibility(3, 2, 0)` returns `true`.
 *                             `dynamicProgrammingTable[3][1][1] = true`. Returns `true`.
 *                           `checkPossibility(3, 1, 1)` returns `true`.
 *                     `dynamicProgrammingTable[2][1][0] = true`. Returns `true`.
 *                   `checkPossibility(2, 1, 0)` returns `true`.
 *                 `dynamicProgrammingTable[1][1][-1] = true`. Returns `true`.
 *               `checkPossibility(1, 1, -1)` returns `true`.
 *             `dynamicProgrammingTable[0][1][-2] = true`. Returns `true`.
 *           `checkPossibility(0, 1, -2)` returns `true`.
 *   `dynamicProgrammingTable[0][0][0] = true`. Returns `true`.
 * Time Complexity: O(L1 * L2 * D_MAX)
 * Space Complexity: O(L1 * L2 * D_MAX)
 */
var possiblyEquals = function (s1, s2) {
  const firstString = s1;
  const secondString = s2;

  const dynamicProgrammingTable = new Array(firstString.length + 1)
    .fill(null)
    .map(() => new Array(secondString.length + 1).fill(null).map(() => ({})));

  function checkPossibility(idxOne, idxTwo, lengthDiff) {
    if (idxOne === firstString.length && idxTwo === secondString.length) {
      return lengthDiff === 0;
    }

    if (dynamicProgrammingTable[idxOne][idxTwo][lengthDiff] !== undefined) {
      return dynamicProgrammingTable[idxOne][idxTwo][lengthDiff];
    }

    const currentCharAtOne = firstString[idxOne];
    const currentCharAtTwo = secondString[idxTwo];

    if (
      idxOne < firstString.length &&
      idxTwo < secondString.length &&
      currentCharAtOne === currentCharAtTwo &&
      lengthDiff === 0 &&
      isNaN(currentCharAtOne)
    ) {
      if (checkPossibility(idxOne + 1, idxTwo + 1, 0)) {
        return (dynamicProgrammingTable[idxOne][idxTwo][lengthDiff] = true);
      }
    }

    if (
      idxOne < firstString.length &&
      isNaN(currentCharAtOne) &&
      lengthDiff < 0
    ) {
      if (checkPossibility(idxOne + 1, idxTwo, lengthDiff + 1)) {
        return (dynamicProgrammingTable[idxOne][idxTwo][lengthDiff] = true);
      }
    }

    if (
      idxTwo < secondString.length &&
      isNaN(currentCharAtTwo) &&
      lengthDiff > 0
    ) {
      if (checkPossibility(idxOne, idxTwo + 1, lengthDiff - 1)) {
        return (dynamicProgrammingTable[idxOne][idxTwo][lengthDiff] = true);
      }
    }

    let parsedNumberFromOne = 0;
    for (
      let digitAdvanceOne = 0;
      digitAdvanceOne < 3 && idxOne + digitAdvanceOne < firstString.length;
      digitAdvanceOne++
    ) {
      const digitCharOne = firstString[idxOne + digitAdvanceOne];
      if (isNaN(digitCharOne)) {
        break;
      }
      parsedNumberFromOne =
        parsedNumberFromOne * 10 + parseInt(digitCharOne, 10);
      if (
        checkPossibility(
          idxOne + digitAdvanceOne + 1,
          idxTwo,
          lengthDiff + parsedNumberFromOne
        )
      ) {
        return (dynamicProgrammingTable[idxOne][idxTwo][lengthDiff] = true);
      }
    }

    let parsedNumberFromTwo = 0;
    for (
      let digitAdvanceTwo = 0;
      digitAdvanceTwo < 3 && idxTwo + digitAdvanceTwo < secondString.length;
      digitAdvanceTwo++
    ) {
      const digitCharTwo = secondString[idxTwo + digitAdvanceTwo];
      if (isNaN(digitCharTwo)) {
        break;
      }
      parsedNumberFromTwo =
        parsedNumberFromTwo * 10 + parseInt(digitCharTwo, 10);
      if (
        checkPossibility(
          idxOne,
          idxTwo + digitAdvanceTwo + 1,
          lengthDiff - parsedNumberFromTwo
        )
      ) {
        return (dynamicProgrammingTable[idxOne][idxTwo][lengthDiff] = true);
      }
    }

    return (dynamicProgrammingTable[idxOne][idxTwo][lengthDiff] = false);
  }

  return checkPossibility(0, 0, 0);
};
