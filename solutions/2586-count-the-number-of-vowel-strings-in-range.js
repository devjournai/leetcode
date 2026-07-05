/**
 * Count The Number Of Vowel Strings In Range
 * Intuition: Iterate through the specified range of words, efficiently checking each word's first and last characters against a predefined set of vowels to determine if it's a vowel string.
 * Approach:
 * 1. Initialize a `Set` data structure containing all standard English vowel characters ('a', 'e', 'i', 'o', 'u') for constant-time character lookup.
 * 2. Declare an integer variable, `vowelStringCountTotal`, to accumulate the count of valid vowel strings found within the given range. Initialize it to zero.
 * 3. Set up a `while` loop that begins its iteration with an index variable, `currentWordIndex`, initialized to the `left` boundary. The loop continues as long as `currentWordIndex` is less than or equal to the `right` boundary.
 * 4. Inside the loop, access the string located at `words[currentWordIndex]`, storing it in a temporary variable `processingWord`.
 * 5. Extract the first character of `processingWord` into `firstChar` and the last character into `lastChar`.
 * 6. Check if both `firstChar` and `lastChar` are present in the `vowelSet` using the `has()` method.
 * 7. If both characters are indeed vowels, increment `vowelStringCountTotal` by one.
 * 8. After processing the current word, increment `currentWordIndex` to move to the next word in the specified range.
 * 9. Once the `while` loop finishes execution, return the final value of `vowelStringCountTotal`.
 * Dry Run:
 * words = ["apple", "banana", "grape", "orange", "kiwi"], left = 0, right = 3
 * vowelSet = {'a', 'e', 'i', 'o', 'u'}
 * vowelStringCountTotal = 0
 *
 * currentWordIndex = 0:
 *   processingWord = "apple"
 *   firstChar = 'a', lastChar = 'e'
 *   vowelSet.has('a') is true, vowelSet.has('e') is true
 *   vowelStringCountTotal becomes 1
 *   currentWordIndex becomes 1
 *
 * currentWordIndex = 1:
 *   processingWord = "banana"
 *   firstChar = 'b', lastChar = 'a'
 *   vowelSet.has('b') is false (condition fails)
 *   vowelStringCountTotal remains 1
 *   currentWordIndex becomes 2
 *
 * currentWordIndex = 2:
 *   processingWord = "grape"
 *   firstChar = 'g', lastChar = 'e'
 *   vowelSet.has('g') is false (condition fails)
 *   vowelStringCountTotal remains 1
 *   currentWordIndex becomes 3
 *
 * currentWordIndex = 3:
 *   processingWord = "orange"
 *   firstChar = 'o', lastChar = 'e'
 *   vowelSet.has('o') is true, vowelSet.has('e') is true
 *   vowelStringCountTotal becomes 2
 *   currentWordIndex becomes 4
 *
 * currentWordIndex = 4: Loop condition (4 <= 3) is false. Loop terminates.
 *
 * Return vowelStringCountTotal = 2
 * Time Complexity: O(R - L + 1)
 * Space Complexity: O(1)
 */
var vowelStrings = function (words, left, right) {
  const vowelSet = new Set(["a", "e", "i", "o", "u"]);
  let vowelStringCountTotal = 0;
  let currentWordIndex = left;

  while (currentWordIndex <= right) {
    const processingWord = words[currentWordIndex];
    const firstChar = processingWord[0];
    const lastChar = processingWord[processingWord.length - 1];

    if (vowelSet.has(firstChar) && vowelSet.has(lastChar)) {
      vowelStringCountTotal++;
    }
    currentWordIndex++;
  }

  return vowelStringCountTotal;
};
