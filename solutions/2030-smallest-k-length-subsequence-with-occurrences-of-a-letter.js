/**
 * Smallest K Length Subsequence With Occurrences Of A Letter
 * Intuition: Utilize a monotonic stack to greedily build the lexicographically smallest subsequence. When considering each character, prioritize smaller characters by popping larger ones from the stack. Crucially, ensure that popping doesn't prevent forming a subsequence of length `k` or satisfying the `repetition` requirement for the `letter`. For non-`letter` characters, only add them if enough slots remain to fulfill the `repetition` count later. If after building the subsequence, the `letter` count is still insufficient, adjust by replacing non-`letter`s from the end of the subsequence.
 * Approach:
 * 1. Calculate the total count of `letter` in the entire input string `s`. Store this in `initialLetterCount`.
 * 2. Initialize an empty stack (`subsequenceStack`) for building the result, a counter `stackLetterInstances` for `letter` occurrences in the stack, and `remainingLetterOccurrences` (initially `initialLetterCount`) to track available `letter`s in the unprocessed part of `s`.
 * 3. Iterate through each character `currentCharacter` of `s` using `processIndex`:
 *    a. If `currentCharacter` matches `charLetter`, decrement `remainingLetterOccurrences` as this `letter` is now being processed or has passed.
 *    b. While `subsequenceStack` is not empty, its top element is lexicographically greater than `currentCharacter`, and popping would still allow forming a `k`-length subsequence (checked by `subsequenceStack.length - 1 + (stringLength - processIndex) >= integerK`), AND either the stack top is not `charLetter` OR there are enough `letter`s overall (`stackLetterInstances + remainingLetterOccurrences > numRepetitions`) to satisfy the `repetition` constraint:
 *       i. If the popped element was `charLetter`, decrement `stackLetterInstances`.
 *       ii. Pop the element from `subsequenceStack`.
 *    c. If `subsequenceStack.length` is less than `integerK`:
 *       i. If `currentCharacter` is `charLetter`, increment `stackLetterInstances`.
 *       ii. Calculate `neededLetterInstances` (remaining `letter`s to reach `numRepetitions`) and `availablePositionsInStack` (slots remaining in the `k`-length subsequence after pushing `currentCharacter`).
 *       iii. If `currentCharacter` is `charLetter` OR `availablePositionsInStack` is sufficient to hold `neededLetterInstances`, push `currentCharacter` onto `subsequenceStack`.
 * 4. After the loop, if `stackLetterInstances` is less than `numRepetitions` (meaning the `k`-length subsequence formed is valid lexicographically but lacks required `letter`s):
 *    a. Create a mutable copy of `subsequenceStack` called `subsequenceBuild`.
 *    b. Calculate `missingTargetLetters`.
 *    c. Iterate `adjustIndex` from `integerK - 1` down to `0`. If `subsequenceBuild[adjustIndex]` is not `charLetter` and `missingTargetLetters` are still needed, replace `subsequenceBuild[adjustIndex]` with `charLetter` and decrement `missingTargetLetters`. This prioritizes replacing characters at the end to minimize lexicographical change.
 *    d. Return the joined string of `subsequenceBuild`.
 * 5. Otherwise (if `stackLetterInstances` meets `numRepetitions`), return the joined string of `subsequenceStack`.
 * Dry Run: s = "topcoder", k = 4, letter = 'o', repetition = 2
 * 1. stringLength = 8. initialLetterCount = 2 ('o' at index 1, 4).
 * 2. subsequenceStack = [], stackLetterInstances = 0, remainingLetterOccurrences = 2.
 * 3. Loop `processIndex` from 0 to 7:
 *    - `processIndex = 0, currentCharacter = 't'`:
 *      - `remainingLetterOccurrences` (2) unchanged.
 *      - `while` (pop): Stack empty, no pop.
 *      - `if (subsequenceStack.length < k)` (0 < 4): true.
 *        - `currentIsTargetLetter` (false).
 *        - `neededLetterInstances = 2-0=2`. `availablePositionsInStack = 4-0-1=3`. `false || (3 >= 2)` is true.
 *        - Push 't'. `subsequenceStack = ['t']`.
 *    - `processIndex = 1, currentCharacter = 'o'`:
 *      - `currentCharacter === charLetter`. `remainingLetterOccurrences` becomes 1.
 *      - `while` (pop): `stack.top='t' > 'o'` false. No pop.
 *      - `if (subsequenceStack.length < k)` (1 < 4): true.
 *        - `currentIsTargetLetter` (true). `stackLetterInstances` becomes 1.
 *        - `neededLetterInstances = 2-1=1`. `availablePositionsInStack = 4-1-1=2`. `true || (2 >= 1)` is true.
 *        - Push 'o'. `subsequenceStack = ['t','o']`.
 *    - `processIndex = 2, currentCharacter = 'p'`:
 *      - `remainingLetterOccurrences` (1) unchanged.
 *      - `while` (pop): `stack.top='o' > 'p'` false. No pop.
 *      - `if (subsequenceStack.length < k)` (2 < 4): true.
 *        - `currentIsTargetLetter` (false).
 *        - `neededLetterInstances = 2-1=1`. `availablePositionsInStack = 4-2-1=1`. `false || (1 >= 1)` is true.
 *        - Push 'p'. `subsequenceStack = ['t','o','p']`.
 *    - `processIndex = 3, currentCharacter = 'c'`:
 *      - `remainingLetterOccurrences` (1) unchanged.
 *      - `while` (pop): `stack.top='p' > 'c'` true. `stack.len-1+(n-i) >= k` (2+(8-3)>=4 -> 7>=4) true. `stack.top !== charLetter` ('p' != 'o') true. Pop 'p'. `subsequenceStack = ['t','o']`.
 *      - `if (subsequenceStack.length < k)` (2 < 4): true.
 *        - `currentIsTargetLetter` (false).
 *        - `neededLetterInstances = 2-1=1`. `availablePositionsInStack = 4-2-1=1`. `false || (1 >= 1)` is true.
 *        - Push 'c'. `subsequenceStack = ['t','o','c']`.
 *    - `processIndex = 4, currentCharacter = 'o'`:
 *      - `currentCharacter === charLetter`. `remainingLetterOccurrences` becomes 0.
 *      - `while` (pop): `stack.top='c' > 'o'` false. No pop.
 *      - `if (subsequenceStack.length < k)` (3 < 4): true.
 *        - `currentIsTargetLetter` (true). `stackLetterInstances` becomes 2.
 *        - `neededLetterInstances = 2-2=0`. `availablePositionsInStack = 4-3-1=0`. `true || (0 >= 0)` is true.
 *        - Push 'o'. `subsequenceStack = ['t','o','c','o']`. `subsequenceStack.length` is 4 (`k`).
 *    - `processIndex = 5, currentCharacter = 'd'`:
 *      - `remainingLetterOccurrences` (0) unchanged.
 *      - `while` (pop): `stack.top='o' > 'd'` false. No pop.
 *      - `if (subsequenceStack.length < k)` (4 < 4): false. (Stack is full, no push).
 *    - `processIndex = 6, currentCharacter = 'e'`: Same as above, no push.
 *    - `processIndex = 7, currentCharacter = 'r'`: Same as above, no push.
 * 4. Loop ends. `subsequenceStack = ['t','o','c','o']`. `stackLetterInstances = 2`. `numRepetitions = 2`.
 * 5. `stackLetterInstances < numRepetitions` (2 < 2): false.
 * 6. Return `subsequenceStack.join('')` which is "toco".
 * Time Complexity: O(N)
 * Space Complexity: O(K)
 */
var smallestSubsequence = function (
  stringS,
  integerK,
  charLetter,
  numRepetitions
) {
  const stringLength = stringS.length;
  let initialLetterCount = 0;
  for (
    let countLoopIndex = 0;
    countLoopIndex < stringLength;
    countLoopIndex++
  ) {
    if (stringS[countLoopIndex] === charLetter) {
      initialLetterCount++;
    }
  }

  const subsequenceStack = [];
  let stackLetterInstances = 0;
  let remainingLetterOccurrences = initialLetterCount;

  for (let processIndex = 0; processIndex < stringLength; processIndex++) {
    const currentCharacter = stringS[processIndex];

    if (currentCharacter === charLetter) {
      remainingLetterOccurrences--;
    }

    while (
      subsequenceStack.length > 0 &&
      subsequenceStack[subsequenceStack.length - 1] > currentCharacter &&
      subsequenceStack.length - 1 + (stringLength - processIndex) >= integerK &&
      (subsequenceStack[subsequenceStack.length - 1] !== charLetter ||
        stackLetterInstances + remainingLetterOccurrences > numRepetitions)
    ) {
      if (subsequenceStack[subsequenceStack.length - 1] === charLetter) {
        stackLetterInstances--;
      }
      subsequenceStack.pop();
    }

    if (subsequenceStack.length < integerK) {
      let currentIsTargetLetter = currentCharacter === charLetter;
      if (currentIsTargetLetter) {
        stackLetterInstances++;
      }

      const neededLetterInstances = numRepetitions - stackLetterInstances;
      const availablePositionsInStack = integerK - subsequenceStack.length - 1;

      if (
        currentIsTargetLetter ||
        availablePositionsInStack >= neededLetterInstances
      ) {
        subsequenceStack.push(currentCharacter);
      }
    }
  }

  if (stackLetterInstances < numRepetitions) {
    let missingTargetLetters = numRepetitions - stackLetterInstances;
    const subsequenceBuild = [...subsequenceStack];

    for (
      let adjustIndex = integerK - 1;
      adjustIndex >= 0 && missingTargetLetters > 0;
      adjustIndex--
    ) {
      if (subsequenceBuild[adjustIndex] !== charLetter) {
        subsequenceBuild[adjustIndex] = charLetter;
        missingTargetLetters--;
      }
    }
    return subsequenceBuild.join("");
  }

  return subsequenceStack.join("");
};
