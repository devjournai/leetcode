/**
 * Remove Adjacent Almost Equal Characters
 * Intuition: The problem requires minimizing operations to eliminate adjacent "almost-equal" character pairs. When such a pair (word[i-1], word[i]) is found, an operation is mandatory. The most efficient operation is to change word[i] to a character that is neither almost-equal to word[i-1] nor word[i+1]. This single operation effectively resolves two potential conflicts: the current one (word[i-1], word[i]) and the subsequent one (word[i], word[i+1]), allowing us to advance past word[i+1] in our scan. This greedy strategy ensures each operation maximizes its impact.
 * Approach: 1. Initialize an operation counter and an index pointer starting from the second character of the word. 2. Iterate through the word using the pointer. 3. For each character, compare it with its preceding character. 4. If they are almost-equal (absolute difference of character codes is 0 or 1), increment the operation counter and advance the pointer by two positions (skipping the current character and the next one). 5. If they are not almost-equal, simply advance the pointer by one position. 6. Return the total operation count.
 * Dry Run: word = "abacaba"
 * 1. Initialize `operationsCount = 0`, `currentIndex = 1`.
 * 2. `currentIndex = 1`: `word[1]` ('b', ASCII 98), `word[0]` ('a', ASCII 97). `Math.abs(98 - 97) = 1`. Condition `1 <= 1` is true.
 *    `operationsCount` becomes `1`. `currentIndex` advances by `2` to `3`.
 * 3. `currentIndex = 3`: `word[3]` ('c', ASCII 99), `word[2]` ('a', ASCII 97). `Math.abs(99 - 97) = 2`. Condition `2 <= 1` is false.
 *    `currentIndex` advances by `1` to `4`.
 * 4. `currentIndex = 4`: `word[4]` ('a', ASCII 97), `word[3]` ('c', ASCII 99). `Math.abs(97 - 99) = 2`. Condition `2 <= 1` is false.
 *    `currentIndex` advances by `1` to `5`.
 * 5. `currentIndex = 5`: `word[5]` ('b', ASCII 98), `word[4]` ('a', ASCII 97). `Math.abs(98 - 97) = 1`. Condition `1 <= 1` is true.
 *    `operationsCount` becomes `2`. `currentIndex` advances by `2` to `7`.
 * 6. `currentIndex = 7`: Loop condition (`7 < word.length (7)`) is false. Loop terminates.
 * 7. Return `operationsCount = 2`.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var removeAlmostEqualCharacters = function (word) {
  let operationsCount = 0;
  let currentIndex = 1;

  while (currentIndex < word.length) {
    let charValueOne = word.charCodeAt(currentIndex);
    let charValuePrevious = word.charCodeAt(currentIndex - 1);
    let charDifference = Math.abs(charValueOne - charValuePrevious);

    if (charDifference <= 1) {
      operationsCount++;
      currentIndex += 2;
    } else {
      currentIndex++;
    }
  }

  return operationsCount;
};
