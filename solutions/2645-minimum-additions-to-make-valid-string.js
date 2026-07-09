/**
 * Minimum Additions To Make Valid String
 * Intuition: To construct a string composed of "abc" concatenations with minimum additions, we greedily try to match the next expected character ('a', 'b', or 'c') with the current character in the input string. If they match, we consume the input character and advance to the next expected character in the 'abc' cycle. If they don't match, it means the expected character is missing, so we must "insert" it (increment our count) and then try to match the *next* character in the 'abc' cycle with the *same* input character.
 * Approach: 1. Initialize `minimumInsertionsCount` to 0. 2. Initialize `inputStringPointer` to 0 to traverse the input `word`. 3. Initialize `expectedCharCycleIndex` to 0, representing the character 'a' in the sequence 'a', 'b', 'c'. A fixed array `alphabetCycle = ['a', 'b', 'c']` helps map this index. 4. Iterate while `inputStringPointer` is less than `word.length`. 5. Inside the loop, determine the `currentExpectedChar` using `alphabetCycle[expectedCharCycleIndex]`. 6. If `word[inputStringPointer]` matches `currentExpectedChar`: advance `inputStringPointer` and update `expectedCharCycleIndex` to the next character in the 'abc' cycle (using modulo 3). 7. Else (mismatch): increment `minimumInsertionsCount` (as the `currentExpectedChar` must be inserted), and update `expectedCharCycleIndex` to the next character in the 'abc' cycle. `inputStringPointer` does not advance in this case because the current character `word[inputStringPointer]` might match the *newly* expected character. 8. After the loop, if `expectedCharCycleIndex` is not 0, it means the last "abc" sequence was not completed. Add `(3 - expectedCharCycleIndex)` to `minimumInsertionsCount` to account for the remaining characters needed. 9. Return `minimumInsertionsCount`.
 * Dry Run: word = "bac"
 * - minimumInsertionsCount = 0
 * - inputStringPointer = 0
 * - expectedCharCycleIndex = 0 (representing 'a')
 * - alphabetCycle = ['a', 'b', 'c']
 *
 * Loop (inputStringPointer < word.length):
 * 1. inputStringPointer = 0:
 *    - currentExpectedChar = alphabetCycle[0] = 'a'
 *    - word[0] = 'b'. Mismatch ('b' !== 'a').
 *    - minimumInsertionsCount = 1 (insert 'a')
 *    - expectedCharCycleIndex = (0 + 1) % 3 = 1 (now expecting 'b')
 *    - inputStringPointer remains 0.
 * 2. inputStringPointer = 0:
 *    - currentExpectedChar = alphabetCycle[1] = 'b'
 *    - word[0] = 'b'. Match ('b' === 'b').
 *    - inputStringPointer = 1
 *    - expectedCharCycleIndex = (1 + 1) % 3 = 2 (now expecting 'c')
 * 3. inputStringPointer = 1:
 *    - currentExpectedChar = alphabetCycle[2] = 'c'
 *    - word[1] = 'a'. Mismatch ('a' !== 'c').
 *    - minimumInsertionsCount = 2 (insert 'c')
 *    - expectedCharCycleIndex = (2 + 1) % 3 = 0 (now expecting 'a')
 *    - inputStringPointer remains 1.
 * 4. inputStringPointer = 1:
 *    - currentExpectedChar = alphabetCycle[0] = 'a'
 *    - word[1] = 'a'. Match ('a' === 'a').
 *    - inputStringPointer = 2
 *    - expectedCharCycleIndex = (0 + 1) % 3 = 1 (now expecting 'b')
 * 5. inputStringPointer = 2:
 *    - currentExpectedChar = alphabetCycle[1] = 'b'
 *    - word[2] = 'c'. Mismatch ('c' !== 'b').
 *    - minimumInsertionsCount = 3 (insert 'b')
 *    - expectedCharCycleIndex = (1 + 1) % 3 = 2 (now expecting 'c')
 *    - inputStringPointer remains 2.
 * 6. inputStringPointer = 2:
 *    - currentExpectedChar = alphabetCycle[2] = 'c'
 *    - word[2] = 'c'. Match ('c' === 'c').
 *    - inputStringPointer = 3
 *    - expectedCharCycleIndex = (2 + 1) % 3 = 0 (now expecting 'a')
 * Loop ends (inputStringPointer = 3, which is not < word.length).
 *
 * Post-loop adjustment:
 * - expectedCharCycleIndex is 0.
 * - minimumInsertionsCount += (3 - 0) % 3 = 0.
 * - minimumInsertionsCount is 3.
 *
 * Return 3.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var addMinimum = function (word) {
  let minimumInsertionsCount = 0;
  let inputStringPointer = 0;
  let expectedCharCycleIndex = 0;
  const alphabetCycle = ["a", "b", "c"];

  while (inputStringPointer < word.length) {
    const currentExpectedChar = alphabetCycle[expectedCharCycleIndex];

    if (word[inputStringPointer] === currentExpectedChar) {
      inputStringPointer++;
      expectedCharCycleIndex = (expectedCharCycleIndex + 1) % 3;
    } else {
      minimumInsertionsCount++;
      expectedCharCycleIndex = (expectedCharCycleIndex + 1) % 3;
    }
  }

  if (expectedCharCycleIndex !== 0) {
    minimumInsertionsCount += 3 - expectedCharCycleIndex;
  }

  return minimumInsertionsCount;
};
